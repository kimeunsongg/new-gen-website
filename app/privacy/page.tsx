import type { Metadata } from "next";
import { Pending } from "@/components/ui";
import { SITE } from "@/data/site";

export const metadata: Metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
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
