"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const educationFields = [
  {
    number: "01",
    title: "생성형 AI 업무 활용",
    description:
      "보고서 작성, 자료 조사, 요약, 기획과 아이디어 도출 등 일상적인 업무에 생성형 AI를 적용합니다.",
    tools: ["ChatGPT", "Gemini", "Claude"],
    featured: true,
  },
  {
    number: "02",
    title: "AI·데이터 분석",
    description:
      "Excel과 AI를 활용한 데이터 정리·분석·시각화부터 Python 기반 데이터 처리까지 직무 수준에 맞춰 교육합니다.",
    tools: ["Excel", "Python", "Google Colab"],
    featured: true,
  },
  {
    number: "03",
    title: "AI 기반 문서·자료 활용",
    description:
      "내부 자료 분석, 핵심 정보 추출, 문서 비교와 업무 목적에 맞는 콘텐츠 생성을 다룹니다.",
    tools: ["Google AI", "생성형 AI"],
  },
  {
    number: "04",
    title: "프롬프트 설계 및 업무 자동화",
    description:
      "원하는 결과를 얻기 위한 프롬프트 구조와 반복 업무를 효율적으로 처리하는 활용 방법을 학습합니다.",
    tools: ["프롬프트 설계", "업무 프로세스 개선"],
  },
  {
    number: "05",
    title: "바이브 코딩",
    description:
      "개발 경험이 없는 실무자도 생성형 AI를 활용해 간단한 웹페이지와 업무 도구를 제작할 수 있도록 교육합니다.",
    tools: ["AI 코딩", "웹 도구 제작"],
  },
];

const programs = [
  {
    label: "BUSINESS",
    title: "기업·산업 현장",
    description:
      "보고서와 기획안 작성, 시장·자료 조사, 데이터 분석, 반복 업무 개선 등 실무자의 생산성 향상에 초점을 맞춥니다.",
    targets: "사무·기획 · 영업 · 관리 · 데이터 실무자",
  },
  {
    label: "PUBLIC",
    title: "공공·행정 현장",
    description:
      "행정문서 작성, 정책자료 조사, 데이터 정리·분석 등 공공업무에 적용할 수 있는 생성형 AI 활용 방법을 다룹니다.",
    targets: "공무원 · 공공기관 실무자 · 행정 담당자",
  },
  {
    label: "EDUCATION",
    title: "학교·교육 현장",
    description:
      "수업 및 교육자료 제작, 자료 조사, 문서 업무, Google AI 활용 등 교직원의 교육·행정 업무를 중심으로 구성합니다.",
    targets: "교직원 · 대학생 · 교육 관계자",
  },
];

const methods = [
  {
    number: "01",
    title: "직무 맞춤형 설계",
    text: "교육 대상, 담당 업무, 활용 목적과 숙련도를 고려해 교육 내용과 난이도를 구성합니다.",
  },
  {
    number: "02",
    title: "실제 업무 사례 중심",
    text: "문서 작성, 자료 조사, 데이터 분석 등 현장에서 자주 접하는 업무를 중심으로 설명합니다.",
  },
  {
    number: "03",
    title: "참여형 실습",
    text: "설명을 듣는 데서 끝나지 않고 직접 프롬프트를 작성하고 결과물을 만들어봅니다.",
  },
];

const expertise = [
  {
    label: "AI EDUCATION",
    title: "교육 및 현장 적용",
    items: [
      "조직과 직무에 맞춘 실습형 커리큘럼 설계",
      "생성형 AI·데이터 분석·업무 자동화 교육",
      "AI 서비스 기획 및 사업화 경험",
    ],
  },
  {
    label: "R&D",
    title: "연구 및 기술 개발",
    items: [
      "도메인 특화 RAG 시스템 연구 참여",
      "AI 기반 언어치료 앱 개발 프로젝트 참여",
      "생성형 AI 관련 특허 공동 발명",
    ],
  },
  {
    label: "BACKGROUND",
    title: "전문 배경 및 자격",
    items: [
      "언어치료학 석사 · 언어재활사 1급",
      "직업상담사 2급",
      "언어재활 및 교육·의료 분야 현장 경험",
    ],
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openedAt = useRef(Date.now());

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

    setFormStatus("sending");
    setFormMessage("");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/wogud8221@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Form submission failed");
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
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="페이지 처음으로">
          ROOT<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          <a href="#education">교육 분야</a>
          <a href="#programs">맞춤 프로그램</a>
          <a href="#about">강사 소개</a>
        </nav>
        <button className="header-inquiry" type="button" onClick={openInquiry}>
          강의 문의
          <span aria-hidden="true">↗</span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">다양한 조직과 직무를 위한 맞춤형 AI 교육</p>
            <h1>
              생성형 AI를
              <br />
              <span>실제 업무의 변화</span>로
              <br />
              연결합니다
            </h1>
            <p className="hero-description">
              교육 대상의 직무와 실제 업무 환경을 분석하여 현장에서 바로
              활용할 수 있는 AI·데이터 교육을 설계합니다.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={openInquiry}>
                강의 문의하기
                <span aria-hidden="true">→</span>
              </button>
              <a className="text-link" href="#education">
                교육 분야 살펴보기
              </a>
            </div>
            <div className="instructor-line">
              <strong>유재형</strong>
              <span>AI·데이터 업무혁신 강사 · 루트 대표</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="portrait-frame">
              <img
                src="./images/profile.webp"
                alt="AI·데이터 업무혁신 강사 유재형 프로필"
              />
              <div className="portrait-label">
                <span>AI &amp; DATA</span>
                <strong>JAEHYEONG YU</strong>
              </div>
            </div>
            <div className="hero-note" aria-hidden="true">
              <span>ROUTE TO</span>
              <strong>BETTER WORK</strong>
            </div>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <div />
          <span>AI EDUCATION</span>
        </div>
      </section>

      <section className="proof-section" aria-labelledby="proof-title">
        <div className="section-number">02</div>
        <div className="proof-heading">
          <p className="section-kicker">FIELD EXPERIENCE</p>
          <h2 id="proof-title">다양한 업무 현장에서 검증된 실무 교육</h2>
        </div>
        <div className="proof-copy">
          <p>
            금융·제조 기업, 공공기관, 교육청, 대학과 학교 등 다양한 조직의
            직무와 업무 환경에 맞춘 AI 교육을 진행합니다.
          </p>
          <div className="field-tags" aria-label="주요 교육 현장">
            <span>금융</span>
            <span>제조</span>
            <span>공공·행정</span>
            <span>교육</span>
          </div>
        </div>
      </section>

      <section className="section education-section" id="education">
        <div className="section-heading">
          <div>
            <p className="section-kicker">WHAT I TEACH</p>
            <h2>업무에 바로 적용하는 AI 교육</h2>
          </div>
          <p>
            단순한 기능 소개를 넘어 문서 작성, 데이터 분석, 반복 업무 개선 등
            실제 직무에 적용할 수 있는 실습형 교육을 제공합니다.
          </p>
        </div>

        <div className="education-grid">
          {educationFields.map((field) => (
            <article
              className={`education-card${field.featured ? " featured" : ""}`}
              key={field.number}
            >
              <div className="card-topline">
                <span>{field.number}</span>
                {field.featured && <span className="core-label">CORE</span>}
              </div>
              <h3>{field.title}</h3>
              <p>{field.description}</p>
              <div className="tool-tags">
                {field.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section programs-section" id="programs">
        <div className="section-heading light">
          <div>
            <p className="section-kicker">CUSTOM PROGRAM</p>
            <h2>조직과 직무에 맞춘 교육 프로그램</h2>
          </div>
          <p>
            같은 AI 도구라도 조직의 업무 방식과 참여자의 직무에 따라 활용
            방법은 달라집니다. 실제 업무 사례를 반영해 교육을 구성합니다.
          </p>
        </div>

        <div className="program-list">
          {programs.map((program, index) => (
            <article className="program-row" key={program.label}>
              <div className="program-index">0{index + 1}</div>
              <div>
                <span className="program-label">{program.label}</span>
                <h3>{program.title}</h3>
              </div>
              <p>{program.description}</p>
              <div className="program-target">
                <span>주요 대상</span>
                <strong>{program.targets}</strong>
              </div>
            </article>
          ))}
        </div>
        <p className="program-note">
          협회, 전문직 단체 및 기타 조직을 위한 맞춤형 교육도 가능합니다.
        </p>
      </section>

      <section className="section method-section" id="method">
        <div className="method-grid">
          <div className="method-copy">
            <p className="section-kicker">HOW I TEACH</p>
            <h2>현장에서 바로 활용하는 실습 중심 교육</h2>
            <p className="method-intro">
              교육 대상의 직무와 AI 활용 수준을 반영해 커리큘럼을 설계하고,
              실제 업무와 유사한 사례를 중심으로 함께 실습합니다.
            </p>
            <div className="method-list">
              {methods.map((method) => (
                <article key={method.number}>
                  <span>{method.number}</span>
                  <div>
                    <h3>{method.title}</h3>
                    <p>{method.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="gallery" aria-label="강의 현장 사진">
            <figure className="gallery-main">
              <img
                src="./images/lecture-classroom.webp"
                alt="참여자들이 노트북으로 생성형 AI를 실습하는 강의 현장"
              />
              <figcaption>생성형 AI 직무 활용 교육</figcaption>
            </figure>
            <figure>
              <img
                src="./images/lecture-workshop.webp"
                alt="소규모 그룹으로 진행하는 AI 실습 교육 현장"
              />
              <figcaption>참여형 AI 실습</figcaption>
            </figure>
            <figure>
              <img
                src="./images/lecture-auditorium-1.webp"
                alt="강당에서 생성형 AI 활용 사례를 설명하는 강의 현장"
              />
              <figcaption>업무 사례 중심 강의</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-intro">
          <div>
            <p className="section-kicker">ABOUT THE INSTRUCTOR</p>
            <h2>연구부터 현장 적용까지 경험한 실무형 강사</h2>
          </div>
          <div className="about-bio">
            <div className="about-name">
              <strong>유재형</strong>
              <span>AI·데이터 업무혁신 강사 · 루트 대표</span>
            </div>
            <p>
              기업, 공공기관, 학교를 대상으로 생성형 AI와 데이터 활용 교육을
              진행하고 있습니다. AI 서비스의 기획, 연구, 개발 및 사업화
              경험을 바탕으로 기술의 기능보다 실제 업무에 적용하는 방법을
              교육합니다.
            </p>
          </div>
        </div>

        <div className="expertise-grid">
          {expertise.map((item) => (
            <article className="expertise-card" key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <ul>
                {item.items.map((listItem) => (
                  <li key={listItem}>{listItem}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="research-band">
          <div>
            <span>PATENT</span>
            <strong>
              거대언어모델을 이용한 언어재활 업무지원 방법 및 시스템
            </strong>
            <p>특허 제10-2915253호 · 공동 발명</p>
          </div>
          <div>
            <span>RESEARCH</span>
            <strong>도메인 특화 RAG 기반 언어재활 목표·치료계획 생성 연구</strong>
            <p>
              <i>Expert Systems with Applications</i> 투고 연구 공동저자
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-watermark" aria-hidden="true">
          ROUTE
        </div>
        <div className="contact-content">
          <p className="section-kicker">LET&apos;S WORK TOGETHER</p>
          <h2>
            조직에 필요한 AI 교육을
            <br />
            함께 설계합니다
          </h2>
          <p>
            교육 대상과 업무 환경, 원하는 교육 내용을 알려주시면 목적에 맞는
            프로그램을 제안해 드립니다.
          </p>
          <button className="contact-button" type="button" onClick={openInquiry}>
            강의 문의하기
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          ROOT<span>.</span>
        </a>
        <p>유재형 · AI·데이터 업무혁신 강사</p>
        <p>© 2026 ROOT. All rights reserved.</p>
      </footer>

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
                <p className="section-kicker">LECTURE INQUIRY</p>
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
              <form className="inquiry-form" onSubmit={handleSubmit}>
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
    </main>
  );
}
