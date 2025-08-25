// src/constants/resumeTemplates.ts
import type { Component } from 'vue';
import BasicTemplate from '../components/resume/templates/BasicTemplate.vue';
import ModernTemplate from '../components/resume/templates/ModernTemplate.vue';

export interface ResumeTemplate {
    id: string;
    name: string;
    layoutComponent: Component;
}

export const ATS_TEMPLATES: ResumeTemplate[] = [
    {
        id: 'basic-ats',
        name: 'Basic ATS Template',
        layoutComponent: BasicTemplate,
    },
    {
        id: 'modern-ats',
        name: 'Modern ATS Template',
        layoutComponent: ModernTemplate,
    },
];