'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FiArrowUpRight, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/ProjectsSection.module.css'

const PROJECTS = profile.projects

export default function ProjectsSection() {
  const sectionRef   = useRef(null)
  const trackRef     = useRef(null)
  const viewportRef  = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isDragging, setIsDragging]     = useState(false)
  const dragStartX   = useRef(0)
  const dragCurrentX  = useRef(0)
  const touchStartY  = useRef(0)
  const touchStartX  = useRef(0)

  // Determine cards per view based on viewport width
  const updateLayout = useCallback(() => {
    if (typeof window === 'undefined') return
    const w = window.innerWidth
    let cpv = 3
    if (w < 680) {
      cpv = 1
    } else if (w < 1120) {
      cpv = 2
    } else {
      cpv = 3
    }
    setCardsPerView(cpv)
    setCurrentIndex(prev => {
      const max = Math.max(0, PROJECTS.length - cpv)
      return Math.min(prev, max)
    })
  }, [])

  useEffect(() => {
    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [updateLayout])

  const maxIndex = Math.max(0, PROJECTS.length - cardsPerView)
  const canPrev  = currentIndex > 0
  const canNext  = currentIndex < maxIndex

  const handlePrev = useCallback(() => {
    setCurrentIndex(i => Math.max(0, i - 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex(i => Math.min(maxIndex, i + 1))
  }, [maxIndex])

  const goToSlide = useCallback((idx) => {
    setCurrentIndex(Math.max(0, Math.min(maxIndex, idx)))
  }, [maxIndex])

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      handleNext()
    }
  }, [handlePrev, handleNext])

  // Touch swipe support (Mobile)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX
    const diffY = touchStartY.current - e.changedTouches[0].clientY

    // Prioritize horizontal swipe if horizontal displacement > vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0 && canNext) {
        handleNext()
      } else if (diffX < 0 && canPrev) {
        handlePrev()
      }
    }
  }

  // Mouse drag support (Desktop)
  const handleMouseDown = (e) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
    dragCurrentX.current = e.clientX
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    dragCurrentX.current = e.clientX
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    const diff = dragStartX.current - dragCurrentX.current
    if (diff > 45 && canNext) {
      handleNext()
    } else if (diff < -45 && canPrev) {
      handlePrev()
    }
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    if (isDragging) setIsDragging(false)
  }

  // Calculate slide offset percentage
  // Each card width = (100% - (cardsPerView - 1) * gap) / cardsPerView
  const gapPx = 20
  const transformStyle = {
    transform: `translateX(calc(-${currentIndex} * (${100 / cardsPerView}% + ${gapPx / cardsPerView}px)))`,
  }

  const progressPercent = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 100

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={styles.section}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Featured Projects Carousel"
    >
      {/* Background ambient accents */}
      <div className={styles.bgGlowTop} aria-hidden />
      <div className={styles.bgWatermark} aria-hidden>PROJECTS</div>

      <div className={styles.container}>
        {/* Header bar */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrowDot} />
              <span className={styles.eyebrow}>Featured Work</span>
            </div>
            <h2 className={styles.title}>
              Crafted <span className={styles.titleAccent}>Projects</span>
            </h2>
            <p className={styles.subtitle}>
              Full-stack applications, modern UI platforms, and practical data & AI solutions.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className={styles.headerControls}>
            <a
              href="https://github.com/ArockiaDass-123?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubProfileLink}
              title="View all repositories on GitHub"
            >
              <FaGithub size={14} />
              <span>GitHub Repos</span>
            </a>

            <div className={styles.counter}>
              <span className={styles.counterCurrent}>
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className={styles.counterDivider}>/</span>
              <span className={styles.counterTotal}>
                {String(PROJECTS.length).padStart(2, '0')}
              </span>
            </div>

            <div className={styles.navButtons}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={!canPrev}
                className={styles.arrowBtn}
                aria-label="Previous project"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canNext}
                className={styles.arrowBtn}
                aria-label="Next project"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel viewport */}
        <div
          ref={viewportRef}
          className={`${styles.viewport} ${isDragging ? styles.isDragging : ''}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={trackRef}
            className={styles.track}
            style={transformStyle}
          >
            {PROJECTS.map((proj, i) => {
              const primaryLink = proj.live || proj.link || proj.github
              const isGithub = (proj.github || proj.link?.includes('github.com'))
              const githubUrl = proj.github || (proj.link?.includes('github.com') ? proj.link : null)
              const liveUrl   = proj.live || (!proj.link?.includes('github.com') ? proj.link : null)

              return (
                <article
                  key={proj.id}
                  className={styles.card}
                  style={{
                    flex: `0 0 calc(${100 / cardsPerView}% - ${(gapPx * (cardsPerView - 1)) / cardsPerView}px)`,
                  }}
                >
                  {/* Card Thumbnail */}
                  <div className={styles.cardThumb}>
                    {proj.image ? (
                      <Image
                        src={proj.image}
                        alt={`${proj.title} - ${proj.desc || 'Full-stack application project'}`}
                        fill
                        sizes="(max-width: 680px) 90vw, (max-width: 1120px) 45vw, 30vw"
                        className={styles.cardImg}
                        priority={i < 2}
                      />
                    ) : (
                      <div className={styles.placeholderImg}>
                        <span>{proj.title[0]}</span>
                      </div>
                    )}
                    <div className={styles.thumbOverlay} aria-hidden />
                    <span className={styles.cardBadge}>0{i + 1}</span>
                  </div>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle} title={proj.title}>
                      {proj.title}
                    </h3>

                    <p className={styles.cardDesc}>
                      {proj.shortDesc || proj.desc}
                    </p>

                    {/* Tech stack tags */}
                    <div className={styles.tagList}>
                      {proj.tech.slice(0, 4).map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                      {proj.tech.length > 4 && (
                        <span className={styles.tagMore}>+{proj.tech.length - 4}</span>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className={styles.cardFooter}>
                      <div className={styles.iconLinks}>
                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.iconBtn}
                            title="View source on GitHub"
                            aria-label={`GitHub source code for ${proj.title}`}
                          >
                            <FaGithub size={15} />
                          </a>
                        )}
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.iconBtn}
                            title="Open live demo"
                            aria-label={`Live demo for ${proj.title}`}
                          >
                            <FiExternalLink size={15} />
                          </a>
                        )}
                      </div>

                      {primaryLink && (
                        <a
                          href={primaryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.viewBtn}
                          aria-label={`View project details for ${proj.title}`}
                        >
                          <span>View Project</span>
                          <FiArrowUpRight size={13} className={styles.viewArrow} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Carousel Bottom Indicator / Pagination */}
        <div className={styles.bottomBar}>
          <div className={styles.paginationDots}>
            {(() => {
              const totalDots = maxIndex + 1
              if (totalDots <= 8) {
                return Array.from({ length: totalDots }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))
              }
              const windowSize = 7
              let start = Math.max(0, currentIndex - Math.floor(windowSize / 2))
              let end = start + windowSize
              if (end > totalDots) {
                end = totalDots
                start = Math.max(0, end - windowSize)
              }
              const visibleIndices = []
              for (let i = start; i < end; i++) visibleIndices.push(i)
              return visibleIndices.map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))
            })()}
          </div>

          <div className={styles.progressBarTrack} aria-hidden>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className={styles.swipeHint}>
            Swipe or use arrows to navigate
          </span>
        </div>
      </div>
    </section>
  )
}
