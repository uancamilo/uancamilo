import { createClient } from 'contentful';

// Only create client if env vars are properly set
const client = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN 
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })
  : null;

// Fetch professional summary
export async function getProfessionalSummary() {
  if (!client) {
    // Silently return null if Contentful is not configured
    return null;
  }
  
  try {
    const response = await client.getEntries({
      content_type: 'professionalSummary',
      limit: 1,
      order: '-sys.createdAt',
    });
    
    return response.items[0] || null;
  } catch (error) {
    // Only log error in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Contentful not configured or content not found:', error.message);
    }
    return null;
  }
}

// Fetch education entries
export async function getEducation() {
  if (!client) return [];
  
  try {
    const response = await client.getEntries({
      content_type: 'education',
      order: '-fields.endDate',
    });
    
    return response.items;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Contentful education not configured:', error.message);
    }
    return [];
  }
}

// Fetch work experience
export async function getExperience() {
  if (!client) return [];
  
  try {
    const response = await client.getEntries({
      content_type: 'experience',
      order: '-fields.startDate',
    });
    
    return response.items;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Contentful experience not configured:', error.message);
    }
    return [];
  }
}

// Fetch certifications
export async function getCertifications() {
  if (!client) return [];
  
  try {
    const response = await client.getEntries({
      content_type: 'certification',
      order: '-fields.issueDate',
    });
    
    return response.items;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Contentful certifications not configured:', error.message);
    }
    return [];
  }
}

// Fetch skills
export async function getSkills() {
  if (!client) return null;
  
  try {
    const response = await client.getEntries({
      content_type: 'skills',
      limit: 1,
      order: '-sys.updatedAt',
    });
    
    return response.items[0] || null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Contentful skills not configured:', error.message);
    }
    return null;
  }
}

// Fetch personal information
export async function getPersonalInfo() {
  if (!client) return null;
  
  try {
    const response = await client.getEntries({
      content_type: 'personalInfo',
      limit: 1,
      order: '-sys.updatedAt',
    });
    
    return response.items[0] || null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Contentful personal info not configured:', error.message);
    }
    return null;
  }
}

// Fetch all CV data in one call
export async function getAllCVData() {
  if (!client) {
    // Return empty data structure if Contentful is not configured
    return {
      summary: null,
      education: [],
      experience: [],
      certifications: [],
      skills: null,
      personalInfo: null,
    };
  }

  try {
    const [summary, education, experience, certifications, skills, personalInfo] = await Promise.all([
      getProfessionalSummary(),
      getEducation(),
      getExperience(),
      getCertifications(),
      getSkills(),
      getPersonalInfo(),
    ]);

    return {
      summary,
      education,
      experience,
      certifications,
      skills,
      personalInfo,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Contentful not configured, using fallback data:', error.message);
    }
    return {
      summary: null,
      education: [],
      experience: [],
      certifications: [],
      skills: null,
      personalInfo: null,
    };
  }
}