import { useState, useEffect } from 'react';

export default function GitHubProfile({ profile }) {
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center space-x-6">
        <img
          src={profile.avatar_url}
          alt={profile.name || profile.login}
          className="w-24 h-24 rounded-full border-4 border-gray-200"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            {profile.name || profile.login}
          </h1>
          <p className="text-lg text-gray-600 mb-2">@{profile.login}</p>
          {profile.bio && (
            <p className="text-gray-700 mb-3">{profile.bio}</p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {profile.location && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {profile.location}
              </div>
            )}
            {profile.blog && (
              <a
                href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                Website
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{profile.public_repos}</div>
          <div className="text-sm text-gray-500">Repositories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{profile.followers}</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{profile.following}</div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
      </div>
    </div>
  );
}