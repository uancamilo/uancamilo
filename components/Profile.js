import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  getGitHubProfile,
  getGitHubRepos,
  getGitHubLanguages,
} from '../lib/github';
import { personalInfo } from '../data/personal-info';

import Profile from '../components/Profile';
import GitHubRepos from '../components/GitHubRepos';
import LanguageStats from '../components/LanguageStats';
import ProfessionalSummary from '../components/ProfessionalSummary';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';

const CVDownloadButton = dynamic(
  () => import('../components/CVDownloadButton'),
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg"
      >
        Loading...
      </button>
    ),
  }
);

export default function Home() {
  const [githubProfile, setProfile] = useState(null);
  const [repos, setRepos] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [profile, reposData, languagesData] = await Promise.all([
          getGitHubProfile(),
          getGitHubRepos(),
          getGitHubLanguages(),
        ]);

        setProfile(profile);
        setRepos(reposData);
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Cargando portafolio...</p>
        </div>
      </div>
    );
  }

  const currentPersonalInfo = cvData?.personalInfo?.fields || personalInfo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <CVDownloadButton personalInfo={currentPersonalInfo} />

      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Profile - padding reducido */}
          <div className="lg:col-span-8 bg-white rounded-xl shadow-md p-3 border border-gray-200">
            <Profile
              profile={githubProfile}
              personalInfo={personalInfo}
              showContactInfo={true}
            />
          </div>

          {/* Skills */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <Skills
              skills={personalInfo.skills}
              contentfulSkills={cvData?.skills}
            />
          </div>

          {/* Summary */}
          <div className="lg:col-span-8 bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <ProfessionalSummary
              summary={personalInfo.summary}
              contentfulSummary={cvData?.summary}
            />
          </div>

          {/* Language Stats */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <LanguageStats languages={languages} />
          </div>

          {/* Experience */}
          <div className="lg:col-span-8 bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <Experience
              experience={personalInfo.experience}
              contentfulExperience={cvData?.experience}
            />
          </div>

          {/* Certifications */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <Certifications
              certifications={personalInfo.certifications}
              contentfulCertifications={cvData?.certifications}
            />
          </div>

          {/* GitHub Repos */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <GitHubRepos repos={repos} />
          </div>

          {/* Education */}
          <div className="lg:col-span-5 bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <Education
              education={personalInfo.education}
              contentfulEducation={cvData?.education}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 py-4">
          <p className="text-xs text-gray-500">
            Actualizado{' '}
            {new Date().toLocaleDateString('es-ES', {
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
