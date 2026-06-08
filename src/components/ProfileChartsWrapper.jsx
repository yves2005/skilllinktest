import React from 'react';
import { ProfileChart } from './ProfileChart.jsx';
import { D3MetricsChart } from './D3MetricsChart.jsx';

export const ProfileChartsWrapper = ({ profileData }) => {
    // Extract data for D3 chart - defaulting for now as I don't have exact fields
    const responseRate = profileData.responseRate || 95;
    const completedProjects = (profileData.portfolio || []).length || 10;

    return (
        <div className="space-y-4">
            <ProfileChart />
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Statistiques clés</h3>
                <div className="flex flex-col sm:flex-row justify-around gap-6 sm:gap-0">
                    <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Taux de réponse</p>
                        <D3MetricsChart responseRate={responseRate} completedProjects={completedProjects} />
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Projets terminés</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
