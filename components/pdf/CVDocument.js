import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { extractPlainText } from '../../lib/richText';

/**
 * Estilos optimizados para ATS
 * - Fuente estándar (Helvetica)
 * - Layout de una columna
 * - Sin gráficos ni colores
 * - Texto plano y seleccionable
 */
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#000000',
  },
  // Header con información personal
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 15,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 12,
    marginBottom: 8,
    color: '#333333',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  contactItem: {
    fontSize: 9,
    marginRight: 15,
  },
  // Secciones
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottomWidth: 0.5,
    borderBottomColor: '#666666',
    paddingBottom: 3,
  },
  // Resumen
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  // Items de experiencia/educación
  itemContainer: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#333333',
  },
  itemMeta: {
    fontSize: 9,
    color: '#555555',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 9,
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  // Listas
  bulletList: {
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 9,
    marginBottom: 2,
    paddingLeft: 10,
  },
  // Skills inline
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    fontSize: 9,
    marginRight: 15,
    marginBottom: 4,
  },
  skillCategory: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    marginTop: 6,
  },
  // Idiomas inline
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageItem: {
    fontSize: 10,
    marginRight: 20,
  },
  // Proyectos
  projectItem: {
    marginBottom: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  projectLanguage: {
    fontSize: 9,
    color: '#555555',
    marginLeft: 8,
  },
  projectDescription: {
    fontSize: 9,
    color: '#333333',
    marginTop: 2,
  },
  projectUrl: {
    fontSize: 8,
    color: '#555555',
    marginTop: 2,
  },
  // Tecnologías
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  techItem: {
    fontSize: 8,
    marginRight: 8,
    color: '#444444',
  },
});

/**
 * Componente de Experiencia
 */
function ExperienceSection({ experiences }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
      {experiences.map((exp) => (
        <View key={exp.id} style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{exp.position}</Text>
          </View>
          <Text style={styles.itemSubtitle}>{exp.company}</Text>
          <Text style={styles.itemMeta}>
            {exp.dateRange} {exp.duration ? `| ${exp.duration}` : ''} {exp.location ? `| ${exp.location}` : ''}
          </Text>
          {exp.description?.json && (
            <Text style={styles.itemDescription}>
              {extractPlainText(exp.description.json, '\n')}
            </Text>
          )}
          {exp.technologies?.length > 0 && (
            <View style={styles.techContainer}>
              <Text style={styles.techItem}>Tecnologías: {exp.technologies.join(', ')}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

/**
 * Componente de Educación
 */
function EducationSection({ education }) {
  if (!education || education.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Formación Académica</Text>
      {education.map((edu) => (
        <View key={edu.id} style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{edu.degree}</Text>
          <Text style={styles.itemSubtitle}>{edu.institution}</Text>
          <Text style={styles.itemMeta}>
            {edu.dateRange} {edu.location ? `| ${edu.location}` : ''}
          </Text>
          {edu.description && (
            <Text style={styles.itemDescription}>{edu.description}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

/**
 * Capitaliza la primera letra de un string
 */
function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Componente de Habilidades agrupadas
 */
function SkillsSection({ skills }) {
  if (!skills || skills.length === 0) return null;

  // Agrupar por categoría
  const grouped = skills.reduce((acc, skill) => {
    const category = skill.category || 'Otras';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Habilidades Técnicas</Text>
      {Object.entries(grouped).map(([category, categorySkills]) => (
        <View key={category}>
          <Text style={styles.skillCategory}>{capitalizeFirst(category)}</Text>
          <View style={styles.skillsContainer}>
            {categorySkills.map((skill) => (
              <Text key={skill.id} style={styles.skillItem}>
                • {skill.name} {skill.level ? `(${skill.level}%)` : ''}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

/**
 * Componente de Idiomas
 */
function LanguagesSection({ languages }) {
  if (!languages || languages.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Idiomas</Text>
      <View style={styles.languagesContainer}>
        {languages.map((lang) => (
          <Text key={lang.id} style={styles.languageItem}>
            • {lang.name}: {lang.level}
          </Text>
        ))}
      </View>
    </View>
  );
}

/**
 * Componente de Proyectos
 */
function ProjectsSection({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Proyectos</Text>
      {projects.map((project) => (
        <View key={project.id} style={styles.projectItem}>
          <View style={styles.projectHeader}>
            <Text style={styles.projectName}>{project.name}</Text>
            {project.language && (
              <Text style={styles.projectLanguage}>({project.language})</Text>
            )}
          </View>
          {project.description && project.description !== 'Sin descripción' && (
            <Text style={styles.projectDescription}>{project.description}</Text>
          )}
          <Text style={styles.projectUrl}>{project.url}</Text>
        </View>
      ))}
    </View>
  );
}

/**
 * CVDocument - Documento PDF principal
 *
 * Optimizado para ATS:
 * - Una columna
 * - Fuentes estándar
 * - Sin gráficos
 * - Texto seleccionable
 */
export default function CVDocument({ data }) {
  const {
    personalInfo,
    experiences,
    skills,
    education,
    languages,
    projects,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header con información personal */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && (
              <Text style={styles.contactItem}>{personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contactItem}>{personalInfo.location}</Text>
            )}
            {personalInfo.website && (
              <Text style={styles.contactItem}>{personalInfo.website}</Text>
            )}
          </View>
        </View>

        {/* Resumen profesional */}
        {personalInfo.summaryText && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil Profesional</Text>
            <Text style={styles.summary}>
              {personalInfo.summaryText}
            </Text>
          </View>
        )}

        {/* Habilidades - Fortaleza */}
        <SkillsSection skills={skills} />

        {/* Educación */}
        <EducationSection education={education} />

        {/* Proyectos */}
        <ProjectsSection projects={projects} />

        {/* Idiomas */}
        <LanguagesSection languages={languages} />

        {/* Experiencia - Al final */}
        <ExperienceSection experiences={experiences} />
      </Page>
    </Document>
  );
}
