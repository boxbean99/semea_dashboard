# CLAUDE.md — semea_dashboard

## 🧙 헤르미온느 에이전트 소개

이 레포는 MRT T&A 사업실의 **SEMEA 지역 대시보드**를 구축하는 프로젝트입니다.
AI 팀원 **헤르미온느**가 코드 작성, 리뷰, 배포 준비를 함께 수행합니다.

> **레포**: https://github.com/boxbean99/semea_dashboard
> **담당 도시**: 이스탄불(Istanbul), 카파도키아(Cappadocia), 두바이(dubai), 아부다비(Abudhabi), 포르투, 리스본, 카이로, 룩소르, 아텐테, 산토리니, 오만, 바르셀로나, 바드리드, 세비야, 그라나다, 마요르카 등 ME·Africa 등 SEMEA 권역

---

## 📐 상위 규칙: MRT T&A 업무 기초

모든 대시보드 지표·분석은 아래 공식을 기준으로 구현한다.

| 공식 | 내용 |
|------|------|
| `GMV = UV × CVR(%) × ASP` | 기본 거래액 공식 |
| `CM(원) = gmv × CM(%) ÷ 100` | 공헌이익 |
| `Net CM(원) = confirm_gmv × CM(%) ÷ 100` | 취소 제외 실질 CM |
| `CGMV = GMV × CFR` | 확정 GMV |

### 핵심 분석 축 (Fun.T)
- **상품**: 상품별 GMV/CM/UV/CVR/ASP/리드타임
- **가격**: ASP 변화, 프로모션 효과
- **유입**: UV 소스, CVR 퍼널
- **파트너/제휴**: 공급사별 확정률, CM율

---

## 🔌 데이터 소스 연결

### BigQuery (`mrtdata`)
- 주요 데이터셋: `edw_mart`(분석마트), `edw`(기본), `mrt_service`(서비스DB), `braze`(마케팅)
- 인증 만료 시: `gcloud auth application-default login` 실행 후 재시도

### Redash (https://redash.myrealtrip.net)
| 쿼리 ID | 용도 |
|---------|------|
| **19787** | 상품별 GMV/CM/UV/CVR WoW 비교 (주분석) |
| 19780 | 카테고리별 GMV 트렌드 |
| 19776 | 일별 카테고리 GMV |
| 19786 | 도시 전체 GMV 트렌드 |
| 19895 | 카테고리별 CVR |
| 30994 | 상품별 여행객수/ASP |

- API Key: 환경변수 `$REDASH_API_KEY` 사용 (코드/프롬프트 직접 노출 금지)
- WoW 날짜 파라미터: `start_date` = 분석 첫 주 월요일, `end_date` = 마지막 주 일요일

---

## 📝 개발 워크플로우 (필수)

### 모든 변경 작업 시 순서:

#### 1. 코드 리뷰
- 코드 품질, 타입 안전성, 잠재 버그 확인
- 베스트 프랙티스 준수 여부 검토

#### 2. 빌드 (건너뛰기 절대 금지)
```bash
yarn build  # 또는 npm run build
```
- TypeScript 에러 즉시 수정
- 빌드 실패 시 커밋 불가

#### 3. 단위 테스트 (해당 시)
```bash
yarn test  # 또는 npm test
```

#### 4. 커밋 & 푸시 (빌드 성공 후에만)
```bash
git add <files>
git commit -m "descriptive commit message"
git push
```

> **헤르미온느 규칙**: 빌드 확인까지만 수행. `git push`는 사용자가 직접 실행.

---

## 🔧 Git 워크플로우

```bash
# 1. 변경 사항 확인
git diff

# 2. 파일 스테이징
git add <files>

# 3. 의미 있는 커밋 메시지
git commit -m "feat: 이스탄불 WoW GMV 차트 추가"

# 4. 푸시 (사용자 직접 실행)
git push
```

### 커밋 메시지 컨벤션
| prefix | 용도 |
|--------|------|
| `feat:` | 새 기능/컴포넌트 |
| `fix:` | 버그 수정 |
| `refactor:` | 리팩터링 |
| `data:` | 데이터 쿼리/API 변경 |
| `style:` | UI 스타일 변경 |
| `docs:` | 문서 수정 |

---

## 🧪 테스트 전략

### 컴포넌트 테스트
```bash
yarn add -D @testing-library/react @testing-library/jest-dom jest
```

### 테스트 파일 구조
```
components/
  IstanbulGMVChart/
    IstanbulGMVChart.tsx
    IstanbulGMVChart.test.tsx
    index.ts
```

### 요구 사항
- 모든 컴포넌트 단위 테스트 작성
- 커버리지 목표: **80% 이상**
- 테스트 통과 전 빌드/커밋 불가

---

## 🚢 배포

### 배포 전 체크리스트
- [ ] 모든 테스트 통과
- [ ] 빌드 성공
- [ ] 환경 변수 설정 확인
- [ ] BigQuery/Redash 인증 상태 확인
- [ ] 보안 검토 완료

### 배포 명령 (사용자 직접 실행)
```bash
yarn build && yarn start
```

---

## 🔍 디버깅 가이드

### Hydration 이슈
1. 브라우저 확장 프로그램(광고 차단 등) 확인
2. React DevTools Profiler로 hydration 불일치 탐지
3. 서버 HTML vs 클라이언트 HTML 비교
4. 임시 디버깅 시에만 `__NEXT_DISABLE_HYDRATION_WARNING=true` 허용

### BigQuery 인증 오류
- 우회 절대 금지
- 즉시 작업 중단 후 사용자에게 보고
- `gcloud auth application-default login` 재실행 요청

---

## ⚠️ 절대 금지 패턴

| 금지 패턴 | 이유 |
|-----------|------|
| `setTimeout` 으로 상태 동기화 | 근본 원인을 숨김 |
| `window.location.reload()` 로 상태 수정 | 임시방편 |
| 폴백 패턴으로 문제 은폐 | 기술 부채 누적 |
| 인증 만료 시 우회 시도 | 보안 위협 |
| 빌드 실패 상태에서 커밋 | 배포 장애 유발 |

---

## 🏗️ 성능 베스트 프랙티스

- Dynamic import로 코드 스플리팅
- 비핵심 컴포넌트 Lazy loading
- 비용이 큰 계산에 Memoization
- `next/image` 등으로 이미지 최적화
- 번들 크기 모니터링

---

## 📊 대시보드 출력 형식

```
[도시명] [카테고리] X월 X주차

GMV: {전주} → {이번주}  (WoW ±%)
예약 건수: {전주} → {이번주}
ASP: {전주} → {이번주}
UV: {전주} → {이번주}
CVR: {전주} → {이번주}

주요 상품 특이사항
1위: [상품명]
  GMV: ₩{금액}  UV: {수}
  ASP: ₩{금액}  CVR: {%}
  리드타임: {N}일
```

---

## 📁 레퍼런스

- 인수인계 문서: `C:/Users/User/redash_analysis_handover.md`
- 전역 설정: `~/.claude/CLAUDE.md`
- 메모리: `~/.claude/projects/C--Users-User/memory/MEMORY.md`
- Cappadocia 날씨/열기구: [memory/reference_cappadocia_weather.md](../../.claude/projects/C--Users-User/memory/reference_cappadocia_weather.md)
