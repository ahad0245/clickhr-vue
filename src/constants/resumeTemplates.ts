// src/constants/resumeTemplates.ts
import type { Component } from 'vue';
import BasicTemplate from '@/components/resume/templates/BasicTemplate.vue';
import ModernTemplate from '@/components/resume/templates/ModernTemplate.vue';
import CompactTemplate from '@/components/resume/templates/CompactTemplate.vue';
import PhotoTemplate from '@/components/resume/templates/PhotoTemplate.vue';

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
        previewImage: '/src/assets/resume-previews/basic-ats-preview.png',
    },
    {
        id: 'modern-ats',
        name: 'Modern ATS Template',
        layoutComponent: ModernTemplate,
        previewImage: '/src/assets/resume-previews/modern-ats-preview.png',
    },
    {
        id: 'compact',
        name: 'Compact Template',
        layoutComponent: CompactTemplate,
        previewImage: '/src/assets/resume-previews/compact-preview.png',
    },
    {
        id: 'photo',
        name: 'Photo Template',
        layoutComponent: PhotoTemplate,
        previewImage: '/src/assets/resume-previews/photo-preview.png',
    },
];