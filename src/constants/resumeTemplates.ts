// src/constants/resumeTemplates.ts
import type { Component } from 'vue';
import BasicTemplate from '@/components/resume/templates/BasicTemplate.vue';
import ModernTemplate from '@/components/resume/templates/ModernTemplate.vue';
import CompactTemplate from '@/components/resume/templates/CompactTemplate.vue';
import PhotoTemplate from '@/components/resume/templates/PhotoTemplate.vue';
import TwoColumnModern from '@/components/resume/templates/TwoColumnModern.vue';
import ProfessionalTemplate from '@/components/resume/templates/ProfessionalTemplate.vue';


export interface ResumeTemplate {
    id: string;
    name: string;
    layoutComponent: Component;
    previewImage: string;
}

export const ATS_TEMPLATES: ResumeTemplate[] = [
    {
        id: 'basic-ats',
        name: 'Basic ATS Template',
        layoutComponent: BasicTemplate,
        // Corrected path to point to the public directory
        previewImage: '/resume-previews/basic-ats-preview.png',
    },
    {
        id: 'modern-ats',
        name: 'Modern ATS Template',
        layoutComponent: ModernTemplate,
        // Corrected path to point to the public directory
        previewImage: '/resume-previews/modern-ats-preview.png',
    },
    {
        id: 'compact',
        name: 'Compact Template',
        layoutComponent: CompactTemplate,
        // Corrected path to point to the public directory
        previewImage: '/resume-previews/compact-preview.png',
    },
    {
        id: 'photo',
        name: 'Photo Template',
        layoutComponent: PhotoTemplate,
        // Corrected path to point to the public directory
        previewImage: '/resume-previews/photo-preview.png',
    },
    {
        id: 'two-column-modern',
        name: 'Two-Column Modern',
        layoutComponent: TwoColumnModern,
        // Corrected path to point to the public directory
        previewImage: '/resume-previews/two-column-modern-preview.png',
    },
    {
        id: 'professional',
        name: 'Professional Template',
        layoutComponent: ProfessionalTemplate,
        // Corrected path to point to the public directory
        previewImage: '/resume-previews/professional-preview.png',
    },
];