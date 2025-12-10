import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
	getGitHubProfile,
	getGitHubRepos,
	getGitHubLanguages,
} from "../lib/github";
import { getAllCVData } from "../lib/contentful";
import { personalInfo } from "../data/personal-info";

import ProfileHeader from "../components/ProfileHeader";
import GitHubRepos from "../components/GitHubRepos";
import LanguageStats from "../components/LanguageStats";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Certifications from "../components/Certifications";

// Dynamic import to avoid SSR issues with html2pdf.js
const CVDownloadButton = dynamic(
	() => import("../components/CVDownloadButton"),
	{
		ssr: false,
		loading: () => (
			<div className="fixed top-4 right-4 z-50">
				<div className="px-6 py-3 bg-gray-200 rounded-lg animate-pulse">
					<div className="h-6 w-24 bg-gray-300 rounded"></div>
				</div>
			</div>
		),
	}
);

export default function Home() {
	const [profile, setProfile] = useState(null);
	const [repos, setRepos] = useState(null);
	const [languages, setLanguages] = useState(null);
	const [cvData, setCvData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchAllData() {
			try {
				const [profileData, reposData, languagesData, contentfulData] =
					await Promise.all([
						getGitHubProfile(),
						getGitHubRepos(),
						getGitHubLanguages(),
						getAllCVData(),
					]);

				setProfile(profileData);
				setRepos(reposData);
				setLanguages(languagesData);
				setCvData(contentfulData);
			} catch (error) {
				console.error("Error al obtener los datos:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchAllData();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
					<p className="mt-4 text-lg text-gray-600">
						Cargando datos del portafolio...
					</p>
				</div>
			</div>
		);
	}

	// Use Contentful data if available, otherwise fallback to static data
	const currentPersonalInfo = cvData?.personalInfo?.fields || personalInfo;

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			{/* Download Button - Fixed position */}
			<CVDownloadButton personalInfo={currentPersonalInfo} />

			{/* Main CV Content */}
			<div id="cv-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header Section with GitHub Profile */}
				<ProfileHeader
					profile={profile}
					personalInfo={currentPersonalInfo}
					contentfulSummary={cvData?.summary}
				/>

				{/* Experience Section */}
				<Experience
					experience={personalInfo.experience}
					contentfulExperience={cvData?.experience}
				/>

				{/* Education Section */}
				<Education
					education={personalInfo.education}
					contentfulEducation={cvData?.education}
				/>

				{/* Skills and Projects Grid */}
				<div className="grid lg:grid-cols-3 gap-8 mb-8">
					<div className="lg:col-span-2">
						<GitHubRepos repos={repos} />
					</div>
					<div className="space-y-8">
						<LanguageStats languages={languages} />
					</div>
				</div>

				{/* Skills Section */}
				<Skills
					skills={personalInfo.skills}
					contentfulSkills={cvData?.skills}
				/>

				{/* Certifications */}
				<Certifications
					certifications={personalInfo.certifications}
					contentfulCertifications={cvData?.certifications}
				/>
			</div>
		</div>
	);
}
