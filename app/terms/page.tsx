import type { Metadata } from "next";
import { Pending } from "@/components/ui";
import { SITE } from "@/data/site";

export const metadata: Metadata = { title: "이용약관" };

export default function TermsPage() {
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
