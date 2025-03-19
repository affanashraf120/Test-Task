"use client";

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (contentRef.current) {
      try {
        const canvas = await html2canvas(contentRef.current, {
          scale: 1.5,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (document) => {
            // Convert all Tailwind colors to hex
            const allElements = document.getElementsByTagName('*');
            for (let el of allElements) {
              const element = el as HTMLElement;
              const computedStyle = window.getComputedStyle(element);
              element.style.color = computedStyle.color;
              element.style.backgroundColor = computedStyle.backgroundColor;
              element.style.borderColor = computedStyle.borderColor;
            }
          }
        });

        // A4 dimensions in mm
        const imgWidth = 210;
        const pageHeight = 297;
        
        // Calculate height to maintain aspect ratio
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF with slightly reduced margins
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        // Add image with adjusted position and size to fit on one page
        pdf.addImage(
          canvas.toDataURL('image/png', 1.0),
          'PNG',
          5,
          5,
          imgWidth - 10,
          Math.min(imgHeight, pageHeight - 10),
          '',
          'FAST'
        );

        pdf.save('alexander_thompson_resume.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }
  };

  return (
    <>
      {/* Download Button - Fixed at top right */}
      <button
        onClick={handleDownload}
        className="fixed top-4 right-4 bg-[#3B82F6] hover:bg-[#2563EB] text-[#FFFFFF] px-4 py-2 rounded-lg 
                   flex items-center gap-2 shadow-lg transition-colors"
      >
        <span>📥</span>
        Download PDF
      </button>

      {/* Resume Content */}
      <div ref={contentRef} className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-[48px] font-light text-[#9CA3AF] mb-6">Alexander Thompson</h1>
          <div className="flex flex-wrap gap-6 text-[#6B7280] mb-8">
            <span className="flex items-center gap-2">
              <span>✉</span>
              alex.thompson@techleader.com
            </span>
            <span className="flex items-center gap-2">
              <span>📱</span>
              +1 (555) 123-4567
            </span>
            <span className="flex items-center gap-2">
              <span>📍</span>
              San Francisco, CA
            </span>
          </div>
          <p className="text-[#6B7280] leading-relaxed text-lg">
            Innovative Tech Leader with 8+ years of experience in software development and team leadership.
            Proven track record of delivering high-impact projects at scale while mentoring engineering teams.
            Passionate about cloud architecture, distributed systems, and creating efficient, scalable solutions
            that drive business growth.
          </p>
        </header>

        {/* Professional Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl text-[#9CA3AF] mb-8 flex items-center gap-3">
            <span>💼</span>
            Professional Experience
          </h2>

          <div className="space-y-8">
            {[
              {
                title: "Senior Engineering Manager",
                company: "TechGiant Inc.",
                location: "San Francisco, CA",
                period: "Dec 2019 - Present",
                description: "Leading a team of 25+ engineers across multiple product lines. Architected and launched company's flagship cloud platform, resulting in 200% revenue growth. Implemented agile methodologies that reduced deployment time by 60%."
              },
              {
                title: "Lead Software Engineer",
                company: "InnovateTech Solutions",
                location: "Mountain View, CA",
                period: "Feb 2017 - Dec 2020",
                description: "Spearheaded development of microservices architecture serving 1M+ users. Mentored junior developers and established best practices for code quality and testing. Reduced system downtime by 99.9%."
              },
              {
                title: "Full Stack Developer",
                company: "StartupRocket",
                location: "Palo Alto, CA",
                period: "May 2016 - Feb 2017",
                description: "Early employee at fast-growing startup. Built and deployed critical features for the main product. Implemented real-time analytics dashboard used by 50K+ customers."
              }
            ].map((job, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-[#3B82F6]">
                <div className="absolute w-3 h-3 bg-[#3B82F6] rounded-full -left-[5px] top-2"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl text-[#9CA3AF]">{job.title}</h3>
                    <div className="text-[#3B82F6]">{job.company}</div>
                    <div className="text-[#6B7280]">{job.location}</div>
                  </div>
                  <div className="text-[#6B7280]">{job.period}</div>
                </div>
                <p className="text-[#6B7280] mt-2">{job.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12">
          <h2 className="text-2xl text-[#9CA3AF] mb-8 flex items-center gap-3">
            <span>🎓</span>
            Education
          </h2>

          <div className="space-y-8">
            {[
              {
                school: "Stanford University",
                degree: "Master of Science in Computer Science",
                period: "Aug 2014 - May 2016",
                details: "Specialized in Artificial Intelligence and Distributed Systems. Research assistant in Cloud Computing Lab."
              },
              {
                school: "University of California, Berkeley",
                degree: "Bachelor of Science in Computer Science & Engineering",
                period: "Aug 2010 - Apr 2014",
                details: "Dean's List all semesters. Led the Software Engineering Club. Completed honors thesis in distributed systems."
              }
            ].map((edu, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-[#3B82F6]">
                <div className="absolute w-3 h-3 bg-[#3B82F6] rounded-full -left-[5px] top-2"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl text-[#9CA3AF]">{edu.school}</h3>
                    <div className="text-[#3B82F6]">{edu.degree}</div>
                  </div>
                  <div className="text-[#6B7280]">{edu.period}</div>
                </div>
                <p className="text-[#6B7280] mt-2">{edu.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-2xl text-[#9CA3AF] mb-8 flex items-center gap-3">
            <span>💡</span>
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "System Architecture", level: "Expert", color: "#22C55E" },
              { name: "Cloud Computing (AWS, GCP)", level: "Expert", color: "#22C55E" },
              { name: "Kubernetes", level: "Advance", color: "#3B82F6" },
              { name: "Node.js/TypeScript", level: "Expert", color: "#22C55E" },
              { name: "React/Next.js", level: "Advance", color: "#3B82F6" },
              { name: "Python", level: "Intermediate", color: "#F97316" },
              { name: "Team Leadership", level: "Basic", color: "#6B7280" },
              { name: "Agile Methodologies", level: "Expert", color: "#22C55E" },
              { name: "System Design", level: "Advance", color: "#3B82F6" },
            ].map((skill) => (
              <div 
                key={skill.name} 
                className="bg-[#F3F4F6] rounded-full px-4 py-2 flex items-center gap-2"
              >
                <span className="text-[#6B7280]">{skill.name}</span>
                <span style={{ color: skill.color }} className="text-sm">
                  • {skill.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}