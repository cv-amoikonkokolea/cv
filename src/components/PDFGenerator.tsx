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
      pdfElement.style.minHeight = '297mm';
      pdfElement.style.backgroundColor = 'white';
      pdfElement.style.fontFamily = 'Arial, sans-serif';
      pdfElement.style.fontSize = '11px';
      pdfElement.style.lineHeight = '1.4';
      pdfElement.style.color = '#333';
      
      // Contenu HTML avec le design exact du modèle
      pdfElement.innerHTML = `
        <div style="width: 210mm; min-height: 297mm; margin: 0; padding: 0; background: white; font-family: Arial, sans-serif; display: flex;">
          
          <!-- Colonne gauche - Sidebar -->
          <div style="width: 35%; background: #f8f9fa; padding: 25px 20px; display: flex; flex-direction: column;">
            
            <!-- Photo et infos contact -->
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; margin: 0 auto 20px auto; border: 3px solid #4472C4;">
                <img src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                     style="width: 100%; height: 100%; object-fit: cover;" 
                     alt="Photo de profil" />
              </div>
              
              <!-- Nom et titre -->
              <h1 style="color: #333; font-size: 18px; font-weight: bold; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.2;">${personalInfo.name}</h1>
              <h2 style="color: #4472C4; font-size: 14px; font-weight: normal; margin: 0 0 20px 0;">${personalInfo.title}</h2>
              
              <!-- Contact -->
              <div style="text-align: left; font-size: 10px; line-height: 1.6; color: #333;">
                <div style="margin-bottom: 8px; display: flex; align-items: center;">
                  <span style="color: #4472C4; margin-right: 8px; font-size: 12px;">📞</span>
                  <span>${contactInfo.phone}</span>
                </div>
                <div style="margin-bottom: 8px; display: flex; align-items: center;">
                  <span style="color: #4472C4; margin-right: 8px; font-size: 12px;">📱</span>
                  <span>${contactInfo.whatsapp}</span>
                </div>
                <div style="margin-bottom: 8px; display: flex; align-items: center;">
                  <span style="color: #4472C4; margin-right: 8px; font-size: 12px;">✉️</span>
                  <span style="word-break: break-all;">${contactInfo.email}</span>
                </div>
                <div style="margin-bottom: 8px; display: flex; align-items: center;">
                  <span style="color: #4472C4; margin-right: 8px; font-size: 12px;">📍</span>
                  <span>${contactInfo.location}</span>
                </div>
              </div>
            </div>

            <!-- Formation -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #333; font-size: 14px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #4472C4; padding-bottom: 5px;">FORMATION</h3>
              
              ${education.map(edu => `
                <div style="margin-bottom: 15px;">
                  <h4 style="color: #333; font-size: 11px; font-weight: bold; margin: 0 0 3px 0; line-height: 1.3;">${edu.degree}</h4>
                  <p style="color: #4472C4; font-size: 10px; margin: 0 0 2px 0; font-weight: 500;">${edu.institution}</p>
                  <p style="color: #666; font-size: 10px; margin: 0;">${edu.year}</p>
                </div>
              `).join('')}
            </div>

            <!-- Compétences -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #333; font-size: 14px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #4472C4; padding-bottom: 5px;">COMPÉTENCES</h3>
              
              ${skills.map(skill => `
                <div style="margin-bottom: 5px;">
                  <span style="color: #4472C4; margin-right: 8px; font-size: 10px;">•</span>
                  <span style="font-size: 10px; color: #333;">${skill}</span>
                </div>
              `).join('')}
              
              <!-- Compétences supplémentaires -->
              <div style="margin-top: 15px;">
                <div style="margin-bottom: 5px;">
                  <span style="color: #4472C4; margin-right: 8px; font-size: 10px;">•</span>
                  <span style="font-size: 10px; color: #333;">Communication et Leadership</span>
                </div>
                <div style="margin-bottom: 5px;">
                  <span style="color: #4472C4; margin-right: 8px; font-size: 10px;">•</span>
                  <span style="font-size: 10px; color: #333;">Capacités rédactionnelles</span>
                </div>
                <div style="margin-bottom: 5px;">
                  <span style="color: #4472C4; margin-right: 8px; font-size: 10px;">•</span>
                  <span style="font-size: 10px; color: #333;">Esprit d'analyse</span>
                </div>
                <div style="margin-bottom: 5px;">
                  <span style="color: #4472C4; margin-right: 8px; font-size: 10px;">•</span>
                  <span style="font-size: 10px; color: #333;">Travail en équipe</span>
                </div>
              </div>
            </div>

            <!-- Langues -->
            <div>
              <h3 style="color: #333; font-size: 14px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #4472C4; padding-bottom: 5px;">LANGUES</h3>
              
              <div style="margin-bottom: 8px;">
                <span style="color: #4472C4; margin-right: 8px; font-size: 10px;">•</span>
                <span style="font-size: 10px; color: #333; font-weight: 500;">Français (Lu, Parlé et Écrit)</span>
              </div>
              <div style="margin-bottom: 8px;">
                <span style="color: #4472C4; margin-right: 8px; font-size: 10px;">•</span>
                <span style="font-size: 10px; color: #333; font-weight: 500;">Anglais (Lu et Écrit)</span>
              </div>
            </div>
          </div>

          <!-- Colonne droite - Contenu principal -->
          <div style="width: 65%; padding: 25px 20px; display: flex; flex-direction: column;">
            
            <!-- À propos de moi -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #333; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 3px solid #4472C4; padding-bottom: 8px;">À PROPOS DE MOI</h3>
              <p style="margin: 0; font-size: 11px; line-height: 1.5; text-align: justify; color: #333;">${personalInfo.summary}</p>
            </div>

            <!-- Expériences professionnelles -->
            <div style="flex: 1;">
              <h3 style="color: #333; font-size: 16px; font-weight: bold; margin: 0 0 20px 0; text-transform: uppercase; border-bottom: 3px solid #4472C4; padding-bottom: 8px;">EXPÉRIENCES PROFESSIONNELLES</h3>
              
              ${experiences.map((exp, index) => `
                <div style="margin-bottom: 25px; ${index < 3 ? '' : 'page-break-inside: avoid;'}">
                  <div style="margin-bottom: 10px;">
                    <h4 style="color: #333; font-size: 12px; font-weight: bold; margin: 0 0 3px 0;">${exp.title}</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                      <p style="color: #4472C4; font-size: 11px; margin: 0; font-weight: 600;">${exp.company}</p>
                      <span style="color: #666; font-size: 10px; font-weight: 500;">${exp.period}</span>
                    </div>
                  </div>
                  
                  <div style="margin-left: 0;">
                    ${exp.tasks.map(task => `
                      <div style="margin-bottom: 3px; font-size: 10px; line-height: 1.4;">
                        <span style="color: #4472C4; margin-right: 6px;">•</span>
                        <span style="color: #333;">${task}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Centre d'intérêts -->
            <div style="margin-top: auto; padding-top: 20px;">
              <h3 style="color: #333; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 3px solid #4472C4; padding-bottom: 8px;">CENTRE D'INTÉRÊTS</h3>
              <p style="margin: 0; font-size: 10px; line-height: 1.5; color: #333;">
                Gestion logistique et données, Formation continue, Développement personnel, 
                Veille technologique, Innovation dans les processus, Assistance humanitaire
              </p>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(pdfElement);

      // Attendre que les images se chargent
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Générer le canvas avec une meilleure résolution
      const canvas = await html2canvas(pdfElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels
        height: 1123, // A4 height in pixels
        logging: false,
      });

      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Calculer les dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Ajouter l'image au PDF
      if (imgHeight > pdfHeight) {
        // Si l'image est plus haute qu'une page, on la redimensionne
        const ratio = pdfHeight / imgHeight;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, pdfHeight);
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