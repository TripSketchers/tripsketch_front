const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
// 🚨 수정된 부분: UUID를 여기서 명시적으로 불러옵니다.
const { v4: uuidv4 } = require("uuid");

// --- 환경 설정 ---
// 1. 서비스 계정 JSON 파일 경로
const serviceAccount = require("./serviceAccountKey.json");
// 2. Firebase Storage 버킷 이름 (gs://를 포함한 전체 URL)
const BUCKET_NAME = "gs://tripsketch-firebase.firebasestorage.app";
// 3. 로컬 이미지 파일이 있는 디렉토리
const LOCAL_IMAGES_DIR = path.join(__dirname, "local_images");
// 4. Firebase Storage에 저장할 경로 접두사
const FIREBASE_STORAGE_PATH = "destination_images";
// --- 설정 끝 ---

// Firebase Admin SDK 초기화
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET_NAME,
});

const bucket = admin.storage().bucket();

/**
 * 로컬 파일을 Firebase Storage에 업로드하고 표준 다운로드 URL을 반환합니다.
 * @param {string} localFilePath 로컬 파일의 전체 경로
 * @param {string} uploadFileName Storage에 저장할 파일 이름 (예: paris.jpg)
 * @returns {Promise<string>} 표준 공개 다운로드 URL
 */
async function uploadFileAndGetUrl(localFilePath, uploadFileName) {
    // Storage에 저장될 최종 경로 (예: destination_images/paris.jpg)
    const destination = `${FIREBASE_STORAGE_PATH}/${uploadFileName}`;

    // **🚨 핵심 수정 부분: 다운로드 토큰을 생성하고 메타데이터에 추가**
    const downloadToken = uuidv4();

    // 파일 업로드 (동일한 경로에 덮어쓰기)
    await bucket.upload(localFilePath, {
        destination: destination,
        metadata: {
            // 브라우저 캐시 설정
            cacheControl: "public, max-age=31536000",
            // 다운로드 토큰 메타데이터 추가 (Firebase 표준 공개 URL을 만드는 핵심)
            metadata: {
                firebaseStorageDownloadTokens: downloadToken,
            },
        },
    });

    // **🚨 핵심 수정 부분: 표준 Firebase 공개 URL을 직접 조합하여 반환**
    const bucketNameWithoutGs = BUCKET_NAME.replace("gs://", "");
    const encodedPath = encodeURIComponent(destination);

    // URL 형식: https://firebasestorage.googleapis.com/v0/b/[버킷이름]/o/[파일경로]?alt=media&token=[토큰]
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketNameWithoutGs}/o/${encodedPath}?alt=media&token=${downloadToken}`;

    return downloadUrl;
}

/**
 * 모든 로컬 파일을 반복하며 업로드 및 URL 획득을 수행합니다.
 */
async function processAllFiles() {
    console.log(`--- [1] 로컬 파일 (${LOCAL_IMAGES_DIR}) 검색 시작 ---`);
    const files = fs
        .readdirSync(LOCAL_IMAGES_DIR)
        .filter((name) => !name.startsWith(".")); // 숨김 파일 제외

    if (files.length === 0) {
        console.error("오류: 'local_images' 폴더에 파일이 없습니다.");
        return;
    }

    console.log(`총 ${files.length}개의 파일이 감지되었습니다.`);

    const uploadResults = [];

    for (const [index, fileName] of files.entries()) {
        const localPath = path.join(LOCAL_IMAGES_DIR, fileName);
        const en_name = path.parse(fileName).name; // 파일명 (확장자 제외)을 en_name으로 사용

        try {
            console.log(
                `[${index + 1}/${
                    files.length
                }] '${fileName}' 업로드 시작 (메타데이터 갱신)...`
            );

            // 파일 업로드 및 URL 획득
            const downloadUrl = await uploadFileAndGetUrl(localPath, fileName);

            console.log(
                `[${index + 1}/${
                    files.length
                }] ✅ 업로드 및 URL 획득 성공. en_name: ${en_name}`
            );

            uploadResults.push({
                en_name: en_name,
                fileName: fileName,
                downloadUrl: downloadUrl,
            });
        } catch (error) {
            console.error(
                `[${index + 1}/${files.length}] ❌ 업로드 실패: ${fileName}`,
                error.message
            );
        }
    }

    console.log("\n--- [2] 전체 업로드 결과 요약 ---");
    console.table(uploadResults);

    // 다음 단계 (DB 업데이트)를 위해 이 데이터를 JSON 파일로 저장합니다.
    const jsonOutputPath = path.join(__dirname, "upload_results.json");
    fs.writeFileSync(jsonOutputPath, JSON.stringify(uploadResults, null, 2));
    console.log(
        `\n데이터베이스 업데이트용 결과 파일 저장 완료: ${jsonOutputPath}`
    );
    console.log(
        "다음 단계: 이 URL 리스트를 사용하여 MySQL Workbench에서 UPDATE 쿼리를 실행하세요."
    );
}

processAllFiles().catch(console.error);
