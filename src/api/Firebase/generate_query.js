const fs = require("fs");
const path = require("path");

const RESULTS_FILE_PATH = path.join(__dirname, "upload_results.json");
const SQL_OUTPUT_PATH = path.join(__dirname, "update_query.txt"); // 🚨 새로 추가된 출력 파일 경로
const DB_TABLE_NAME = "trip_destination_tb";
const EN_NAME_COLUMN = "en_name";
const IMAGE_URL_COLUMN = "img"; // JSON 필드명과 일치하는지 확인 (이전 대화 기반)

if (!fs.existsSync(RESULTS_FILE_PATH)) {
    console.error(
        `오류: 업로드 결과 파일이 없습니다. 먼저 'upload_photos.js'를 실행하세요.`
    );
    return;
}

const uploadResults = JSON.parse(fs.readFileSync(RESULTS_FILE_PATH, "utf8"));

// CASE WHEN 구문 생성
const caseWhenClauses = uploadResults
    .map(
        (item) =>
            // item.downloadUrl 대신 item.img를 사용하도록 수정 (만약 upload_results.json이 downloadUrl을 사용한다면 item.downloadUrl 유지)
            // 이전 스크립트에서는 downloadUrl을 사용했으므로 이를 유지합니다.
            `        WHEN '${item.en_name.replace(
                /'/g,
                "''"
            )}' THEN '${item.downloadUrl.replace(/'/g, "''")}'`
    )
    .join("\n");

// WHERE IN 구문 생성
const enNameList = uploadResults
    .map((item) => `'${item.en_name.replace(/'/g, "''")}'`)
    .join(", ");

const sqlQuery = `
-- -----------------------------------------------------------------------------------
-- MySQL UPDATE 쿼리 (총 ${uploadResults.length}개 항목 일괄 업데이트)
-- -----------------------------------------------------------------------------------

-- 1. 안전 모드 해제 (필요시)
SET SQL_SAFE_UPDATES = 0;

-- 2. CASE 문을 사용한 일괄 UPDATE
UPDATE ${DB_TABLE_NAME}
SET ${IMAGE_URL_COLUMN} = 
    CASE ${EN_NAME_COLUMN}
${caseWhenClauses}
        ELSE ${IMAGE_URL_COLUMN} -- 목록에 없는 레코드는 기존 값 유지
    END
WHERE ${EN_NAME_COLUMN} IN (
    ${enNameList}
);

-- 3. 안전 모드 복구 (권장)
SET SQL_SAFE_UPDATES = 1;
-- -----------------------------------------------------------------------------------
-- 쿼리 생성 완료. MySQL Workbench에서 이 쿼리를 실행하세요.
-- -----------------------------------------------------------------------------------
`;

// 🚨 SQL 쿼리를 파일로 저장
try {
    fs.writeFileSync(SQL_OUTPUT_PATH, sqlQuery);
    console.log(`\n--- SQL 쿼리 파일 생성 완료 ---`);
    console.log(`✅ 생성된 파일: ${SQL_OUTPUT_PATH}`);
    console.log(
        `\n이제 이 파일을 열어 쿼리를 복사하여 MySQL Workbench에 붙여넣고 실행하세요.`
    );
} catch (error) {
    console.error(`❌ 파일 저장 중 오류 발생: ${error.message}`);
}
