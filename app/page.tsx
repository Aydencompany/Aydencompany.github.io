"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const courses = [
  {
    image: "./mobile/course-generative.webp",
    alt: "생성형 AI 업무 화면",
    badge: "핵심 01",
    title: "생성형 AI 업무 활용",
    description: (
      <>
        보고서 작성, 자료 조사, 요약, 기획과 아이디어 도출 등
        <br />
        일상적인 업무에 생성형 AI를 적용합니다.
      </>
    ),
  },
  {
    image: "./mobile/course-data.webp",
    alt: "AI 데이터 분석 화면",
    badge: "핵심 02",
    title: "AI·데이터 분석",
    description: (
      <>
        Excel·AI 데이터 분석부터 Python 처리까지
        <br />
        직무별로 교육합니다.
      </>
    ),
  },
  {
    image: "./mobile/course-docs.webp",
    alt: "AI 문서 활용 화면",
    title: "AI 기반 문서·자료 활용",
    variant: "docs",
    description: (
      <>
        내부 자료 분석, 핵심 정보 추출, 문서 비교와 업무
        <br />
        목적에 맞는 콘텐츠 생성을 다룹니다.
      </>
    ),
  },
  {
    image: "./mobile/course-automation.webp",
    alt: "프롬프트 자동화 화면",
    title: "프롬프트 설계 및 업무 자동화",
    variant: "automation",
    description: (
      <>
        원하는 결과를 얻기 위한 프롬프트 구조와 반복 업무를
        <br />
        효율적으로 처리하는 활용 방법을 학습합니다.
      </>
    ),
  },
  {
    image: "./mobile/course-vibe.webp",
    alt: "바이브 코딩 화면",
    title: "바이브 코딩",
    description: (
      <>
        개발 경험이 없는 실무자도 생성형 AI를 활용해
        <br />
        간단한 웹페이지와 업무 도구를 제작할 수 있습니다.
      </>
    ),
  },
];

const programs = [
  {
    badge: "핵심 01",
    title: "직무 맞춤형 설계",
    image: "./mobile/program-custom.webp",
    alt: "직무 맞춤형 교육 자료",
    description: (
      <>
        교육 대상, 담당 업무, 활용 목적과 숙련도를 고려해
        <br />
        교육 내용과 난이도를 구성합니다.
      </>
    ),
  },
  {
    badge: "핵심 02",
    title: "실제 업무 사례 중심",
    image: "./mobile/program-case.webp",
    alt: "현장 강의 모습",
    description: (
      <>
        문서 작성, 자료 조사, 데이터 분석 등 현장에서 자주 접하는
        <br />
        업무를 중심으로 설명합니다.
      </>
    ),
  },
  {
    badge: "핵심 03",
    title: "참여형 실습",
    image: "./mobile/program-practice.webp",
    alt: "참여형 실습 모습",
    description: (
      <>
        설명을 듣는 데서 끝나지 않고 직접 프롬프트를 작성하고
        <br />
        결과물을 만들어봅니다.
      </>
    ),
  },
];

const profileCards = [
  {
    title: "교육 및 현장 적용",
    items: [
      "조직과 직무에 맞춘 실습형 커리큘럼 설계",
      "생성형 AI·데이터 분석·업무 자동화 교육",
      "AI 서비스 기획 및 사업화 경험",
    ],
  },
  {
    title: "연구 및 기술 개발",
    items: [
      "도메인 특화 RAG 시스템 연구 참여",
      "AI 기반 언어치료 앱 개발 프로젝트 참여",
      "생성형 AI 관련 특허 공동 발명",
    ],
  },
  {
    title: "전문 배경 및 자격",
    items: [
      "언어치료학 석사·언어재활사 1급",
      "직업상담사 2급",
      "언어재활 및 교육·의료 분야 현장 경험",
    ],
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

const FORM_ENDPOINT =
  "https://formsubmit.co/ajax/d291a1a7144008f6c4518e695ac71860";

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openedAt = useRef(Date.now());

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInquiryOpen) return;
    openedAt.current = Date.now();
    document.body.classList.add("modal-open");
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsInquiryOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isInquiryOpen]);

  const openInquiry = () => {
    setFormStatus("idle");
    setFormMessage("");
    setIsInquiryOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Date.now() - openedAt.current < 2500) {
      setFormStatus("error");
      setFormMessage("잠시 후 다시 시도해 주세요.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("_honey")) return;

    const fieldValue = (name: string, fallback = "미입력") => {
      const value = formData.get(name);
      return typeof value === "string" && value.trim() ? value.trim() : fallback;
    };

    const inquiryData = {
      "기업·기관명": fieldValue("기업·기관명"),
      담당자명: fieldValue("담당자명"),
      연락처: fieldValue("연락처"),
      email: fieldValue("email"),
      "교육 대상·인원": fieldValue("교육 대상·인원"),
      "희망 교육 주제": fieldValue("희망 교육 주제", "미정"),
      "희망 일정": fieldValue("희망 일정", "미정"),
      "교육 방식": fieldValue("교육 방식", "협의 필요"),
      "문의 내용": fieldValue("문의 내용"),
      "개인정보 수집 동의": formData.has("개인정보 수집 동의")
        ? "동의함"
        : "미동의",
      _subject: "[ROOT 강의 문의] 새로운 문의가 도착했습니다",
      _template: "table",
      _captcha: "false",
      _url: "https://aydencompany.github.io/",
    };

    setFormStatus("sending");
    setFormMessage("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData),
      });

      const result = (await response.json()) as {
        success?: boolean | string;
        message?: string;
      };
      const wasSuccessful =
        result.success === true || result.success === "true";

      if (!response.ok || !wasSuccessful) {
        throw new Error(result.message || "Form submission failed");
      }

      form.reset();
      setFormStatus("success");
      setFormMessage(
        "문의가 접수되었습니다. 확인 후 입력하신 연락처로 답변드리겠습니다.",
      );
    } catch {
      setFormStatus("error");
      setFormMessage(
        "문의 전송에 실패했습니다. 잠시 후 다시 시도하거나 이메일로 연락해 주세요.",
      );
    }
  };

  return (
    <>
      <main className="mobile-page">
        <section className="mobile-hero">
          <div className="hero-copy reveal">
            <h1>
              생성형 AI를
              <br />
              실제 업무의 변화로
              <br />
              연결합니다.
            </h1>
            <p>
              교육 대상의 직무와 실제 업무 환경을 분석하여
              <br />
              현장에서 바로 활용할 수 있는 AI 데이터 교육을 설계합니다.
            </p>
          </div>

          <div className="hero-tags reveal reveal-delay-1">
            <span>생성형 AI 업무 활용</span>
            <span>AI·데이터 분석</span>
            <span>바이브 코딩</span>
            <span>AI 기반 문서·자료 활용</span>
            <span>프롬프트 설계 및 업무 자동화</span>
          </div>

          <div className="hero-art">
            <img
              className="hero-main-image"
              src="./mobile/hero-main.webp"
              alt="AI 실무 교육 강사 유재형"
            />
            <span className="floating-icon floating-icon-chatgpt">
              <img src="./mobile/logo-chatgpt.png" alt="" />
            </span>
            <span className="floating-icon floating-icon-claude">
              <img src="./mobile/logo-claude.png" alt="" />
            </span>
            <span className="floating-icon floating-icon-gemini">
              <img src="./mobile/logo-gemini.png" alt="" />
            </span>
          </div>

          <button
            className="mobile-cta hero-cta reveal"
            type="button"
            onClick={openInquiry}
          >
            <strong>강의 문의하기</strong>
            <img src="./mobile/arrow-right.svg" alt="" />
          </button>
        </section>

        <section id="courses" className="mobile-section course-section">
          <h2 className="reveal">업무에 바로 적용하는 AI 교육</h2>
          <div className="course-list">
            {courses.map((course) => (
              <article
                className={`course-card reveal${
                  course.variant ? ` course-card-${course.variant}` : ""
                }`}
                key={course.title}
              >
                <img src={course.image} alt={course.alt} />
                <div className="card-copy">
                  <div>
                    {course.badge && <b>{course.badge}</b>}
                    <h3>{course.title}</h3>
                  </div>
                  <p>{course.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="programs" className="mobile-section program-section">
          <h2 className="reveal">조직과 직무에 맞춘 교육 프로그램</h2>
          {programs.map((program) => (
            <article className="program reveal" key={program.title}>
              <div className="program-title">
                <b>{program.badge}</b>
                <h3>{program.title}</h3>
              </div>
              <div className="program-image">
                <img src={program.image} alt={program.alt} />
              </div>
              <p>{program.description}</p>
            </article>
          ))}
        </section>

        <section id="profile" className="mobile-section profile-section">
          <h2 className="reveal">
            연구부터 현장 적용까지
            <br />
            경험한 실무형 강사
          </h2>
          <div className="profile-list">
            <article className="patent reveal">
              <h3>
                거대언어모델을 이용한 언어재활 업무지원
                <br />
                방법 및 시스템
              </h3>
              <p>특허 제10-2915253호·공동 발명</p>
            </article>
            <article className="patent reveal">
              <h3>
                도메인 특화 RAG 기반 언어재활 목표 ·
                <br />
                치료계획 생성 연구
              </h3>
              <p>Expert Systems with Applications 투고 연구 공동저자</p>
            </article>
            {profileCards.map((card) => (
              <article className="profile-card reveal" key={card.title}>
                <h3>{card.title}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="mobile-contact">
          <div className="reveal">
            <h2>
              조직에 필요한 AI 교육을
              <br />
              함께 설계합니다
            </h2>
            <p>
              교육 대상과 업무 환경, 원하는 교육 내용을 알려주시면
              <br />
              목적에 맞는 프로그램을 제안해 드립니다
            </p>
          </div>
          <button
            className="mobile-cta reveal"
            type="button"
            onClick={openInquiry}
          >
            <strong>강의 문의하기</strong>
            <img src="./mobile/arrow-right.svg" alt="" />
          </button>
        </section>
      </main>

      {isInquiryOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsInquiryOpen(false);
          }}
        >
          <section
            className="inquiry-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
          >
            <div className="modal-header">
              <div>
                <p className="modal-kicker">LECTURE INQUIRY</p>
                <h2 id="inquiry-title">강의 문의</h2>
              </div>
              <button
                ref={closeButtonRef}
                className="modal-close"
                type="button"
                aria-label="문의 창 닫기"
                onClick={() => setIsInquiryOpen(false)}
              >
                ×
              </button>
            </div>

            {formStatus === "success" ? (
              <div className="form-success" role="status">
                <span aria-hidden="true">✓</span>
                <h3>문의가 접수되었습니다.</h3>
                <p>{formMessage}</p>
                <button type="button" onClick={() => setIsInquiryOpen(false)}>
                  확인
                </button>
              </div>
            ) : (
              <form
                className="inquiry-form"
                action="https://formsubmit.co/d291a1a7144008f6c4518e695ac71860"
                method="POST"
                acceptCharset="UTF-8"
                onSubmit={handleSubmit}
              >
                <input
                  className="honeypot"
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <input
                  type="hidden"
                  name="_subject"
                  value="[ROOT 강의 문의] 새로운 문의가 도착했습니다"
                />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_url"
                  value="https://aydencompany.github.io/"
                />

                <div className="form-grid">
                  <label>
                    <span>기업·기관명 *</span>
                    <input
                      type="text"
                      name="기업·기관명"
                      placeholder="기업 또는 기관명을 입력해 주세요"
                      required
                    />
                  </label>
                  <label>
                    <span>담당자명 *</span>
                    <input
                      type="text"
                      name="담당자명"
                      placeholder="성함을 입력해 주세요"
                      required
                    />
                  </label>
                  <label>
                    <span>연락처 *</span>
                    <input
                      type="tel"
                      name="연락처"
                      placeholder="010-0000-0000"
                      inputMode="tel"
                      required
                    />
                  </label>
                  <label>
                    <span>이메일 *</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@company.com"
                      required
                    />
                  </label>
                  <label>
                    <span>교육 대상·인원</span>
                    <input
                      type="text"
                      name="교육 대상·인원"
                      placeholder="예: 영업 담당자 30명"
                    />
                  </label>
                  <label>
                    <span>희망 교육 주제</span>
                    <select name="희망 교육 주제" defaultValue="">
                      <option value="" disabled>
                        주제를 선택해 주세요
                      </option>
                      <option>생성형 AI 업무 활용</option>
                      <option>AI·데이터 분석</option>
                      <option>프롬프트 및 업무 자동화</option>
                      <option>바이브 코딩</option>
                      <option>기타 맞춤 교육</option>
                    </select>
                  </label>
                  <label>
                    <span>희망 일정</span>
                    <input
                      type="text"
                      name="희망 일정"
                      placeholder="예: 2026년 9월 중"
                    />
                  </label>
                  <label>
                    <span>교육 방식</span>
                    <select name="교육 방식" defaultValue="">
                      <option value="" disabled>
                        방식을 선택해 주세요
                      </option>
                      <option>대면</option>
                      <option>비대면</option>
                      <option>협의 필요</option>
                    </select>
                  </label>
                </div>

                <label className="message-field">
                  <span>문의 내용 *</span>
                  <textarea
                    name="문의 내용"
                    rows={5}
                    placeholder="교육 목적과 요청사항을 자유롭게 작성해 주세요"
                    required
                  />
                </label>

                <label className="privacy-check">
                  <input type="checkbox" name="개인정보 수집 동의" required />
                  <span>
                    문의 답변을 위한 개인정보 수집·이용에 동의합니다. 수집
                    정보는 문의 확인 및 답변 목적으로만 사용됩니다.
                  </span>
                </label>

                {formMessage && (
                  <p
                    className={`form-status ${formStatus}`}
                    role="alert"
                    aria-live="polite"
                  >
                    {formMessage}
                  </p>
                )}

                <button
                  className="form-submit"
                  type="submit"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending" ? "전송 중..." : "문의 보내기"}
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
