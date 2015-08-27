import React from 'react/addons';

import SectionBase from '../SectionBase';
import CampaignOverviewPane from './CampaignOverviewPane';
import CampaignPlannerPane from './CampaignPlannerPane';
import AllActivitiesPane from './AllActivitiesPane';
import AllActionsPane from './AllActionsPane';


export default class CampaignSection extends SectionBase {
    getSubSections() {
        return [
            { path: 'dashboard', title: 'Overview',
                startPane: CampaignOverviewPane },
            { path: 'actions', title: 'All actions',
                startPane: AllActionsPane },
            { path: 'activities', title: 'Activities',
                startPane: AllActivitiesPane },
            { path: 'planner', title: 'Planner',
                startPane: CampaignPlannerPane }
        ];
    }
}
