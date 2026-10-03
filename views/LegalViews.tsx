import { SITE } from "@/data/site";
import type { Locale } from "@/lib/i18n";

// 법적 문서는 문장 구조가 달라 언어별로 따로 작성. ⚠ 영문은 번역 초안

const EFFECTIVE = { ko: "2026년 10월 5일", en: "October 5, 2026" };
const OFFICER = { ko: "정재천", en: "Jeong Jae-cheon" };
const REG_NO = "131-82-86370";
const KAKAO_PRIVACY = "https://www.kakao.com/policy/privacy";

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function PrivacyView({ locale }: { locale: Locale }) {
  if (locale === "en") {
    return (
      <article className="legal container">
        <h1>Privacy Policy</h1>
        <p>Effective date: {EFFECTIVE.en}</p>
        <section>
          <h2>1. Collection of Personal Information</h2>
          <p>
            The Newgen Leadership School website does not operate any feature that directly collects or stores visitors&apos;
            personal information, such as member sign-up or inquiry forms.
          </p>
        </section>
        <section>
          <h2>2. Consultations</h2>
          <p>
            Admissions consultations take place through our KakaoTalk channel ({SITE.kakaoId}) and by phone ({SITE.phone}).
            During a consultation we receive only what is needed for it, such as the names of the parent and student, contact
            details and grade. Phone consultations are not recorded.
          </p>
          <p>
            Conversations exchanged on KakaoTalk are stored and processed by Kakao under its own{" "}
            <ExtLink href={KAKAO_PRIVACY}>privacy policy</ExtLink>. Consultation notes kept separately by the school are
            retained for <strong>one year from the end of the consultation</strong> and then destroyed. Documents of students
            who enroll are kept separately under the school&apos;s student-record rules.
          </p>
        </section>
        <section>
          <h2>3. Automatically Collected Information</h2>
          <p>
            The website does not use visitor analytics tools (such as Google Analytics) and does not use cookies. However, the
            servers of our hosting provider (Railway) may temporarily keep access logs (IP address, access time and requested
            page) for security and troubleshooting, in accordance with the provider&apos;s policy.
          </p>
        </section>
        <section>
          <h2>4. Student Photos</h2>
          <p>Photos and activity records of current students are posted on the website only with guardian consent.</p>
        </section>
        <section>
          <h2>5. Privacy Officer</h2>
          <p>
            Name: {OFFICER.en}
            <br />
            Position: Principal
            <br />
            Phone: {SITE.phone}
          </p>
        </section>
      </article>
    );
  }

  return (
    <article className="legal container">
      <h1>개인정보처리방침</h1>
      <p>시행일: {EFFECTIVE.ko}</p>
      <section>
        <h2>1. 개인정보의 수집</h2>
        <p>
          {SITE.name} 홈페이지는 회원가입, 문의 양식 등 방문자의 개인정보를 직접 수집하거나 저장하는 기능을 운영하지
          않습니다.
        </p>
      </section>
      <section>
        <h2>2. 상담</h2>
        <p>
          입학 상담은 카카오톡 채널({SITE.kakaoId})과 전화({SITE.phone})로 진행됩니다. 상담 과정에서는 보호자·학생 이름,
          연락처, 학년 등 상담에 필요한 범위의 정보만 받습니다. 전화 상담은 녹음하지 않습니다.
        </p>
        <p>
          카카오톡으로 주고받은 대화는 카카오의 <ExtLink href={KAKAO_PRIVACY}>개인정보처리방침</ExtLink>에 따라 카카오가
          보관·처리합니다. 학교가 별도로 기록한 상담 내용은 <strong>상담 종료일로부터 1년간 보관한 뒤 파기</strong>합니다.
          입학한 학생의 서류는 학적 관리 기준에 따라 별도로 보관합니다.
        </p>
      </section>
      <section>
        <h2>3. 자동으로 수집되는 정보</h2>
        {/* 방문 통계 도구(GA, 네이버 애널리틱스 등)를 추가하면 이 항목을 바꿔야 함 */}
        <p>
          홈페이지는 방문 통계 도구(구글 애널리틱스 등)를 사용하지 않으며, 쿠키를 사용하지 않습니다. 다만 홈페이지 호스팅
          업체(Railway)의 서버에 보안·장애 대응을 위한 접속 기록(IP 주소, 접속 시각, 요청한 페이지)이 업체 정책에 따라
          일시적으로 남을 수 있습니다.
        </p>
      </section>
      <section>
        <h2>4. 학생 사진 게시</h2>
        <p>홈페이지에 게시되는 재학생 사진과 활동 기록은 보호자의 동의를 받은 경우에만 게시합니다.</p>
      </section>
      <section>
        <h2>5. 개인정보 보호책임자</h2>
        {/* TODO: 이메일을 받으면 "이메일:" 줄 추가 */}
        <p>
          성명: {OFFICER.ko}
          <br />
          직책: 교장
          <br />
          전화: {SITE.phone}
        </p>
      </section>
    </article>
  );
}

export function TermsView({ locale }: { locale: Locale }) {
  if (locale === "en") {
    return (
      <article className="legal container">
        <h1>Terms of Use</h1>
        <p>Effective date: {EFFECTIVE.en}</p>
        <section>
          <h2>1. Purpose</h2>
          <p>These terms set out the conditions and procedures for using the Newgen Leadership School website (the &ldquo;Website&rdquo;).</p>
        </section>
        <section>
          <h2>2. Copyright</h2>
          <p>
            Copyright in all content posted on the Website, including text, photos and logos, belongs to Newgen Leadership
            School or the original authors. Content may not be copied, distributed or modified without prior permission.
          </p>
        </section>
        <section>
          <h2>3. Changes to Posted Information</h2>
          <p>
            Posted information such as the academic calendar, curriculum and admissions guidance may change without notice
            depending on school circumstances. Please confirm details through a consultation.
          </p>
        </section>
        <section>
          <h2>4. External Services</h2>
          <p>
            The Website provides links to external services such as KakaoTalk channels, Instagram, YouTube and Naver Blog. The
            terms and policies of each service apply to their use.
          </p>
        </section>
        <section>
          <h2>5. Operator Information</h2>
          <p>
            Name: Newgen Leadership School
            <br />
            Representative: {OFFICER.en}
            <br />
            Registration No.: {REG_NO}
            <br />
            Address: 5F, 30 Mangma-ro, Yeosu-si, Jeonnam-Gwangju Integrated Special City, Korea
            <br />
            Phone: {SITE.phone}
          </p>
        </section>
      </article>
    );
  }

  return (
    <article className="legal container">
      <h1>이용약관</h1>
      <p>시행일: {EFFECTIVE.ko}</p>
      <section>
        <h2>1. 목적</h2>
        <p>이 약관은 {SITE.name} 홈페이지(이하 &ldquo;홈페이지&rdquo;)의 이용 조건과 절차를 정합니다.</p>
      </section>
      <section>
        <h2>2. 저작권</h2>
        <p>
          홈페이지에 게시된 글, 사진, 로고 등 모든 콘텐츠의 저작권은 {SITE.name} 또는 원저작자에게 있습니다. 사전
          허락 없이 복제, 배포, 변경하여 사용할 수 없습니다.
        </p>
      </section>
      <section>
        <h2>3. 게시 정보의 변경</h2>
        <p>
          학사일정, 교육과정, 입학 안내 등 게시 정보는 학교 사정에 따라 예고 없이 변경될 수 있습니다. 정확한 내용은
          상담을 통해 확인해 주세요.
        </p>
      </section>
      <section>
        <h2>4. 외부 서비스</h2>
        <p>
          홈페이지는 카카오톡 채널, 인스타그램, 유튜브, 네이버 블로그 등 외부 서비스로 연결되는 링크를 제공합니다.
          외부 서비스의 이용에는 각 서비스의 약관과 정책이 적용됩니다.
        </p>
      </section>
      <section>
        <h2>5. 운영자 정보</h2>
        <p>
          상호: {SITE.name}
          <br />
          대표자: {OFFICER.ko}
          <br />
          고유번호: {REG_NO}
          <br />
          주소: {SITE.address}
          <br />
          전화: {SITE.phone}
        </p>
      </section>
    </article>
  );
}
