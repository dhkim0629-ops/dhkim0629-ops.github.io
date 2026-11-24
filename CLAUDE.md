# 작업 규칙 (dhkim0629-ops.github.io)

이 저장소는 TEAM JINO가 쓰는 웹 화면을 올리는 곳입니다.
- `address/` 거래처 주소록 (JINO 열쇠 로그인 + Supabase 암호화 저장)
- `law/` 회원사용 노동관계법령 개정 안내 (`law/admin.html`은 TEAM JINO 관리 화면)

## 고치기 전에 꼭
1. **먼저 저장소의 최신 내용을 받은 뒤 그 파일을 고칩니다.** 예전 대화나 내 컴퓨터에 남아 있는 복사본으로 덮어쓰지 않습니다. 여러 대화에서 같은 파일을 고치고 있습니다.
2. **열쇠 파일(key.json) 주소 순서를 바꾸지 않습니다.** jinolabor 조직 주소를 먼저, 안 되면 예전 주소를 읽습니다.
   ```
   https://raw.githubusercontent.com/jinolabor/config-files/main/key.json
   https://raw.githubusercontent.com/dhkim0629-ops/config-files/main/key.json
   ```
3. 비밀번호, 마스터키, 고객사 데이터는 이 저장소에 절대 올리지 않습니다. 이 저장소는 공개입니다.

## 주소록(address) 참고
- 로그인: key.json으로 비밀번호 확인 → 급여대행과 같은 구성원 명단(Supabase `payroll_members`)으로 서버가 매번 확인
- 데이터: Supabase `addr_docs` (팀 열쇠로 암호화), 함수 `addr_*`
- 엑셀 내보내기: 대표 + 대표가 관리 화면에서 허용한 사람만 (서버 확인, 기록 남김)
