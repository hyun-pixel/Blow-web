# BLOW 0.1.16 설치파일 공개 기록

확인일: 2026-10-06 (한국 시간)
상태: 사용자 승인으로 파일 공개 및 원본 일치 검증 완료. 홈페이지 커밋·푸시·Vercel 배포도 승인받아 진행.

- 원본: C:/Users/User/.codex/worktrees/5f9a/new-chat-4/apps/desktop/release/BLOW-Setup-0.1.16-x64.exe
- 파일·제품 버전: 0.1.16
- 크기: 117,233,300바이트(약 117.2MB)
- SHA-256: 1608e2ad96f1c8d0ad3c1c3a5f7e50d887d1422dc8e501a38eda96583ede182b
- Authenticode: NotSigned. 기존 게시자 전자 서명 없음 안내 유지.
- 실행·설치: 진행하지 않음. 프로그램 동작 검증을 의미하지 않음.
- 작업 사본: work/release-0.1.16/BLOW-Setup-0.1.16-x64.exe. 원본 해시와 일치. Git 이력에 실행파일을 추가하지 않음.
- 공개 릴리스: https://github.com/hyun-pixel/Blow-web/releases/tag/desktop-v0.1.16
- 공개 다운로드: https://github.com/hyun-pixel/Blow-web/releases/download/desktop-v0.1.16/BLOW-Setup-0.1.16-x64.exe
- 태그 기준: dccf6cf9118e9f31232ae3feaa4409755f864711. 파일을 배포하는 홈페이지 저장소의 기준이며 앱 원본 소스 태그가 아님.
- 기존 0.1.11 릴리스는 보존. 홈페이지 제공 파일은 0.1.16으로 변경.

## 홈페이지 변경

src/download.html의 버전·파일명·크기·설치파일 링크·배포 설명 링크를 교체한다. scripts/build.mjs의 페이지 설명, scripts/check.mjs의 기존 검증 기대값과 dist/download/index.html을 함께 갱신한다. 그 밖의 디자인·요금·가이드는 변경하지 않는다.

## 업로드 확인

- GitHub 저장소의 현재 이름: hyun-pixel/Blow-web (기존 hyun-pixel/Blow 주소에서 연결).
- 릴리스 ID: 404235132, tagName=desktop-v0.1.16, isDraft=false, isPrerelease=false.
- 공개 시각: 2026-10-06 11:24:23 (한국 시간).
- GitHub 자산 상태 uploaded, 크기 117,233,300바이트, digest sha256:1608e2ad96f1c8d0ad3c1c3a5f7e50d887d1422dc8e501a38eda96583ede182b. 로컬 원본과 일치.
- 빌드·7개 페이지 정적 검사 통과. 공개 URL에서 인증 없이 HTTP 200으로 파일 전체 다운로드 성공. 117,233,300바이트와 SHA-256 모두 원본과 일치. 검증 기록: work/release-0.1.16/public-download-verification.json.

- 최종 화면 검수: 별도 임시 로컬 서버에서 390px·1440px 다운로드 화면의 0.1.16 표시, 117.2MB 용량, 새 저장소 다운로드 주소, 설치파일 링크 1개, 가로 넘침 없음과 JavaScript 오류 없음을 확인했다. 캡처: work/release-0.1.16/. 기존 4173 포트는 변경하지 않았다.
