import { SITE } from "@/data/site";
import { KakaoIcon } from "./Icons";

type Props = { children: React.ReactNode; className?: string; iconSize?: number };

export function KakaoButton({ children, className = "btn btn--kakao", iconSize = 20 }: Props) {
  return (
    <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className={className}>
      <KakaoIcon size={iconSize} />
      {children}
    </a>
  );
}

export function KakaoFloat() {
  return (
    <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className="kakao-float" aria-label="카카오톡 상담">
      <KakaoIcon size={28} />
    </a>
  );
}

export function ConsultBand() {
  return (
    <section className="consult-band" aria-labelledby="consult-title">
      <div className="container consult-band__inner">
        <div>
          <h2 id="consult-title" className="consult-band__title">
            입학 상담은 카카오톡으로
          </h2>
          <p className="consult-band__desc">
            입학은 별도의 복잡한 시험 없이, 편안한 대면 상담을 통해 진행됩니다.
            <br />
            먼저 편하게 상담을 신청해 주세요.
          </p>
        </div>
        <KakaoButton className="btn btn--kakao btn--lg">상담 연결하기</KakaoButton>
      </div>
    </section>
  );
}
