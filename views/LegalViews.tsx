import { Pending } from "@/components/ui";
import { SITE } from "@/data/site";
import type { Locale } from "@/lib/i18n";

// 법적 문서는 문장 구조가 달라 언어별로 따로 작성. ⚠ 영문은 번역 초안

export function PrivacyView({ locale }: { locale: Locale }) {
  if (locale === "en") {
    const P = () => <Pending>To be provided</Pending>;
    return (
      <article className="legal container">
        <h1>Privacy Policy</h1>
        <p>
          Effective date: <P />
        </p>
        <section>
          <h2>1. Collection of Personal Information</h2>
          <p>
            The Newgen Leadership School website does not operate any feature that directly collects or stores visitors&apos;
            personal information, such as member sign-up or inquiry forms.
          </p>
        </section>
        <section>
          <h2>2. Consultation Channel</h2>
          <p>
            Admissions consultations take place through our KakaoTalk channel ({SITE.kakaoId}). Information provided during
            consultations is subject to Kakao&apos;s privacy policy, and the school uses it only for consultation purposes.
            Retention period for consultation records: <P />
          </p>
        </section>
        <section>
          <h2>3. Automatically Collected Information</h2>
          <p>
            Use of visitor analytics tools: <P /> Once the hosting environment is finalized, automatically collected items
            such as access logs and their retention periods will be described here.
          </p>
        </section>
        <section>
          <h2>4. Student Photos</h2>
          <p>Photos and activity records of current students are posted on the website only with guardian consent.</p>
        </section>
        <section>
          <h2>5. Privacy Officer</h2>
          <p>
            Name: <P />
            <br />
            Email: <P />
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
      <p>
        시행일: <Pending />
      </p>
      <section>
        <h2>1. 개인정보의 수집</h2>
        <p>
          {SITE.name} 홈페이지는 회원가입, 문의 양식 등 방문자의 개인정보를 직접 수집하거나 저장하는 기능을 운영하지
          않습니다.
        </p>
      </section>
      <section>
        <h2>2. 상담 채널</h2>
        <p>
          입학 상담은 카카오톡 채널({SITE.kakaoId})을 통해 이루어집니다. 상담 과정에서 제공되는 정보는 카카오의
          개인정보처리방침이 적용되며, 학교는 상담 목적 범위 안에서만 이를 이용합니다. 상담 기록 보관 기간:{" "}
          <Pending />
        </p>
      </section>
      <section>
        <h2>3. 자동으로 수집되는 정보</h2>
        <p>
          방문 통계 도구 사용 여부: <Pending /> 호스팅 환경이 확정되면 접속 기록 등 자동 수집 항목과 보관 기간을 이
          곳에 안내합니다.
        </p>
      </section>
      <section>
        <h2>4. 학생 사진 게시</h2>
        <p>홈페이지에 게시되는 재학생 사진과 활동 기록은 보호자의 동의를 받은 경우에만 게시합니다.</p>
      </section>
      <section>
        <h2>5. 개인정보 보호책임자</h2>
        <p>
          성명: <Pending />
          <br />
          이메일: <Pending />
          <br />
          전화: {SITE.phone}
        </p>
      </section>
    </article>
  );
}

export function TermsView({ locale }: { locale: Locale }) {
  if (locale === "en") {
    const P = () => <Pending>To be provided</Pending>;
    return (
      <article className="legal container">
        <h1>Terms of Use</h1>
        <p>
          Effective date: <P />
        </p>
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
            Representative: <P />
            <br />
            Registration number: <P />
            <br />
            Address: 5F, 30 Mangma-ro, Yeosu-si, Jeollanam-do, Korea
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
      <p>
        시행일: <Pending />
      </p>
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
          대표자: <Pending />
          <br />
          고유번호: <Pending />
          <br />
          주소: {SITE.address}
          <br />
          전화: {SITE.phone}
        </p>
      </section>
    </article>
  );
}
