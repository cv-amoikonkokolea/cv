import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';

interface PDFGeneratorProps {
  personalInfo: {
    name: string;
    title: string;
    summary: string;
  };
  contactInfo: {
    phone: string;
    whatsapp: string;
    email: string;
    location: string;
  };
  experiences: Array<{
    period: string;
    title: string;
    company: string;
    description: string;
    tasks: string[];
  }>;
  education: Array<{
    year: string;
    degree: string;
    institution: string;
  }>;
  skills: string[];
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  personalInfo,
  contactInfo,
  experiences,
  education,
  skills
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Créer un élément temporaire pour le PDF
      const pdfElement = document.createElement('div');
      pdfElement.id = 'pdf-content';
      pdfElement.style.position = 'absolute';
      pdfElement.style.left = '-9999px';
      pdfElement.style.width = '210mm';
      pdfElement.style.backgroundColor = 'white';
      pdfElement.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      pdfElement.style.fontSize = '14px';
      pdfElement.style.lineHeight = '1.5';
      pdfElement.style.color = '#374151';
      
      // Contenu HTML reproduisant exactement le design web
      pdfElement.innerHTML = `
        <div style="width: 210mm; background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); min-height: 297mm; padding: 20px; box-sizing: border-box;">
          
          <!-- Section Profil -->
          <div style="background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden; margin-bottom: 40px;">
            <div style="background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 50%, #16a34a 100%); padding: 48px 32px; color: white;">
              <div style="display: flex; align-items: center; gap: 32px;">
                <div style="width: 128px; height: 128px; border-radius: 50%; overflow: hidden; border: 4px solid rgba(255,255,255,0.3); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); flex-shrink: 0;">
                  <img src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                       style="width: 100%; height: 100%; object-fit: cover;" 
                       alt="Photo de profil" />
                </div>
                <div style="flex: 1;">
                  <h1 style="font-size: 48px; font-weight: bold; margin: 0 0 8px 0; line-height: 1.1;">${personalInfo.name}</h1>
                  <h2 style="font-size: 24px; font-weight: 300; margin: 0 0 16px 0; color: #bfdbfe;">${personalInfo.title}</h2>
                  <p style="font-size: 18px; color: #bfdbfe; margin: 0; line-height: 1.6; max-width: 800px;">${personalInfo.summary}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section Expérience -->
          <div style="background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); padding: 32px; margin-bottom: 40px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
              <div style="width: 48px; height: 48px; background: #2563eb; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M20 6h-2V4c0-1.11-.89-2-2-2h-4c0-1.11-.89-2-2-2H6c-1.11 0-2 .89-2 2v2H2c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM6 4h4v2H6V4zm14 15H2V8h2v2h2V8h8v2h2V8h2v11z"/>
                </svg>
              </div>
              <h2 style="font-size: 32px; font-weight: bold; color: #111827; margin: 0;">Expérience Professionnelle</h2>
            </div>
            
            <div style="space-y: 32px;">
              ${experiences.slice(0, 4).map((exp, index) => `
                <div style="position: relative; border-left: 4px solid #16a34a; padding-left: 32px; margin-bottom: 32px;">
                  <div style="position: absolute; left: -8px; top: 0; width: 16px; height: 16px; background: #16a34a; border-radius: 50%;"></div>
                  <div style="background: linear-gradient(90deg, #f9fafb 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
                      <h3 style="font-size: 20px; font-weight: bold; color: #111827; margin: 0; flex: 1;">${exp.title}</h3>
                      <span style="background: #fed7aa; color: #ea580c; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500; white-space: nowrap;">
                        ${exp.period}
                      </span>
                    </div>
                    <p style="color: #2563eb; font-weight: 600; margin: 0 0 8px 0; font-size: 16px;">${exp.company}</p>
                    <p style="color: #374151; margin: 0 0 16px 0; font-size: 14px; line-height: 1.6;">${exp.description}</p>
                    <div style="space-y: 8px;">
                      ${exp.tasks.map(task => `
                        <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                          <svg width="16" height="16" fill="#16a34a" viewBox="0 0 24 24" style="margin-top: 2px; flex-shrink: 0;">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          <span style="color: #374151; font-size: 14px; line-height: 1.6;">${task}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Page break si nécessaire -->
          <div style="page-break-before: always;"></div>

          <!-- Suite des expériences si plus de 4 -->
          ${experiences.length > 4 ? `
            <div style="background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); padding: 32px; margin-bottom: 40px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
                <div style="width: 48px; height: 48px; background: #2563eb; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path d="M20 6h-2V4c0-1.11-.89-2-2-2h-4c0-1.11-.89-2-2-2H6c-1.11 0-2 .89-2 2v2H2c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM6 4h4v2H6V4zm14 15H2V8h2v2h2V8h8v2h2V8h2v11z"/>
                  </svg>
                </div>
                <h2 style="font-size: 32px; font-weight: bold; color: #111827; margin: 0;">Expérience Professionnelle (suite)</h2>
              </div>
              
              <div style="space-y: 32px;">
                ${experiences.slice(4).map((exp, index) => `
                  <div style="position: relative; border-left: 4px solid #16a34a; padding-left: 32px; margin-bottom: 32px;">
                    <div style="position: absolute; left: -8px; top: 0; width: 16px; height: 16px; background: #16a34a; border-radius: 50%;"></div>
                    <div style="background: linear-gradient(90deg, #f9fafb 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
                        <h3 style="font-size: 20px; font-weight: bold; color: #111827; margin: 0; flex: 1;">${exp.title}</h3>
                        <span style="background: #fed7aa; color: #ea580c; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500; white-space: nowrap;">
                          ${exp.period}
                        </span>
                      </div>
                      <p style="color: #2563eb; font-weight: 600; margin: 0 0 8px 0; font-size: 16px;">${exp.company}</p>
                      <p style="color: #374151; margin: 0 0 16px 0; font-size: 14px; line-height: 1.6;">${exp.description}</p>
                      <div style="space-y: 8px;">
                        ${exp.tasks.map(task => `
                          <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                            <svg width="16" height="16" fill="#16a34a" viewBox="0 0 24 24" style="margin-top: 2px; flex-shrink: 0;">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            <span style="color: #374151; font-size: 14px; line-height: 1.6;">${task}</span>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Section Formation -->
          <div style="background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); padding: 32px; margin-bottom: 40px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
              <div style="width: 48px; height: 48px; background: #16a34a; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18M12,3L1,9L12,15L21,10.09V17H23V9L12,3Z"/>
                </svg>
              </div>
              <h2 style="font-size: 32px; font-weight: bold; color: #111827; margin: 0;">Formation</h2>
            </div>
            
            <div style="space-y: 24px;">
              ${education.map((edu, index) => `
                <div style="background: linear-gradient(90deg, #ecfdf5 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
                    <div style="flex: 1;">
                      <h3 style="font-size: 20px; font-weight: bold; color: #111827; margin: 0 0 8px 0; line-height: 1.3;">${edu.degree}</h3>
                      <p style="color: #374151; font-size: 16px; margin: 0;">${edu.institution}</p>
                    </div>
                    <span style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; white-space: nowrap;">
                      ${edu.year}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section Compétences -->
          <div style="background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); padding: 32px; margin-bottom: 40px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
              <div style="width: 48px; height: 48px; background: #ea580c; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                </svg>
              </div>
              <h2 style="font-size: 32px; font-weight: bold; color: #111827; margin: 0;">Compétences</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
              ${skills.map((skill, index) => `
                <div style="background: linear-gradient(90deg, #fff7ed 0%, #fef3c7 100%); border-radius: 12px; padding: 16px; text-align: center;">
                  <span style="color: #1f2937; font-weight: 500; font-size: 16px;">${skill}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section Atouts -->
          <div style="background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); padding: 32px; margin-bottom: 40px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
              <div style="width: 48px; height: 48px; background: #7c3aed; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
                </svg>
              </div>
              <h2 style="font-size: 32px; font-weight: bold; color: #111827; margin: 0;">Atouts</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
              <div style="background: linear-gradient(90deg, #faf5ff 0%, #fce7f3 100%); border-radius: 12px; padding: 24px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="width: 48px; height: 48px; background: #e9d5ff; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <svg width="24" height="24" fill="#7c3aed" viewBox="0 0 24 24">
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                    </svg>
                  </div>
                  <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0;">Respectueuse</h3>
                </div>
              </div>
              <div style="background: linear-gradient(90deg, #faf5ff 0%, #fce7f3 100%); border-radius: 12px; padding: 24px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="width: 48px; height: 48px; background: #e9d5ff; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <svg width="24" height="24" fill="#7c3aed" viewBox="0 0 24 24">
                      <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                    </svg>
                  </div>
                  <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0;">Travailleuse</h3>
                </div>
              </div>
              <div style="background: linear-gradient(90deg, #faf5ff 0%, #fce7f3 100%); border-radius: 12px; padding: 24px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="width: 48px; height: 48px; background: #e9d5ff; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <svg width="24" height="24" fill="#7c3aed" viewBox="0 0 24 24">
                      <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
                    </svg>
                  </div>
                  <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0;">Leadership</h3>
                </div>
              </div>
              <div style="background: linear-gradient(90deg, #faf5ff 0%, #fce7f3 100%); border-radius: 12px; padding: 24px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="width: 48px; height: 48px; background: #e9d5ff; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <svg width="24" height="24" fill="#7c3aed" viewBox="0 0 24 24">
                      <path d="M16,4C16.88,4 17.67,4.84 17.67,5.75C17.67,6.66 16.88,7.5 16,7.5C15.12,7.5 14.33,6.66 14.33,5.75C14.33,4.84 15.12,4 16,4M13,1L15.5,3.5L14.08,4.92L12,2.84L9.92,4.92L8.5,3.5L11,1H13M12,6.5C12.83,6.5 13.5,7.17 13.5,8V16.5H11V22H13V18.5H15V22H17V16.5H15.5V8C15.5,7.17 14.83,6.5 14,6.5H12Z"/>
                    </svg>
                  </div>
                  <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0;">Capacité à travailler seul et en équipe</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Section Contact -->
          <div style="background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); padding: 32px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
              <div style="width: 48px; height: 48px; background: #2563eb; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                </svg>
              </div>
              <h2 style="font-size: 32px; font-weight: bold; color: #111827; margin: 0;">Contact</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
              <div>
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                  <div style="width: 48px; height: 48px; background: #dbeafe; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <svg width="20" height="20" fill="#2563eb" viewBox="0 0 24 24">
                      <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                    </svg>
                  </div>
                  <div>
                    <p style="font-weight: 500; color: #111827; font-size: 16px; margin: 0 0 4px 0;">Téléphone</p>
                    <p style="color: #6b7280; font-size: 16px; margin: 0;">${contactInfo.phone}</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                  <div style="width: 48px; height: 48px; background: #dcfce7; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <svg width="20" height="20" fill="#16a34a" viewBox="0 0 24 24">
                      <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                    </svg>
                  </div>
                  <div>
                    <p style="font-weight: 500; color: #111827; font-size: 16px; margin: 0 0 4px 0;">WhatsApp</p>
                    <p style="color: #6b7280; font-size: 16px; margin: 0;">${contactInfo.whatsapp}</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                  <div style="width: 48px; height: 48px; background: #fed7aa; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <svg width="20" height="20" fill="#ea580c" viewBox="0 0 24 24">
                      <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                    </svg>
                  </div>
                  <div>
                    <p style="font-weight: 500; color: #111827; font-size: 16px; margin: 0 0 4px 0;">Email</p>
                    <p style="color: #6b7280; font-size: 16px; margin: 0; word-break: break-all;">${contactInfo.email}</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="width: 48px; height: 48px; background: #e9d5ff; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <svg width="20" height="20" fill="#7c3aed" viewBox="0 0 24 24">
                      <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                  <div>
                    <p style="font-weight: 500; color: #111827; font-size: 16px; margin: 0 0 4px 0;">Localisation</p>
                    <p style="color: #6b7280; font-size: 16px; margin: 0;">${contactInfo.location}</p>
                  </div>
                </div>
              </div>
              
              <div style="background: linear-gradient(135deg, #e0f2fe 0%, #ecfdf5 100%); border-radius: 12px; padding: 24px;">
                <h3 style="font-size: 20px; font-weight: bold; color: #111827; margin: 0 0 16px 0;">Informations Personnelles</h3>
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  Téléchargez ce CV au format PDF pour vos candidatures professionnelles.
                </p>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(pdfElement);

      // Attendre que les images se chargent
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Générer le canvas avec une meilleure résolution
      const canvas = await html2canvas(pdfElement, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels
        logging: false,
      });

      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png', 0.95);
      
      // Calculer les dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Si le contenu dépasse une page, on le divise
      if (imgHeight > pdfHeight) {
        // Première page
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight);
        
        // Pages suivantes si nécessaire
        let remainingHeight = imgHeight - pdfHeight;
        let currentY = -pdfHeight;
        
        while (remainingHeight > 0) {
          pdf.addPage();
          const pageHeight = Math.min(remainingHeight, pdfHeight);
          pdf.addImage(imgData, 'PNG', 0, currentY, imgWidth, imgHeight);
          remainingHeight -= pdfHeight;
          currentY -= pdfHeight;
        }
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      // Télécharger
      const fileName = `CV_${personalInfo.name.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);

      // Nettoyer
      document.body.removeChild(pdfElement);
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1 md:space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span className="text-xs md:text-sm hidden sm:inline">Génération...</span>
        </>
      ) : (
        <>
          <Download size={16} />
          <span className="text-xs md:text-sm hidden sm:inline">PDF</span>
        </>
      )}
    </button>
  );
};

export default PDFGenerator;