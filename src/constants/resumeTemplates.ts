// src/constants/resumeTemplates.ts
import type { Component } from 'vue';
import BasicTemplate from '@/components/resume/templates/BasicTemplate.vue';
import ModernTemplate from '@/components/resume/templates/ModernTemplate.vue';
import CompactTemplate from '@/components/resume/templates/CompactTemplate.vue';
import PhotoTemplate from '@/components/resume/templates/PhotoTemplate.vue';
import TwoColumnModern from '@/components/resume/templates/TwoColumnModern.vue';
import ProfessionalTemplate from '@/components/resume/templates/ProfessionalTemplate.vue';
import PhotoTwoColumn from '@/components/resume/templates/PhotoTwoColumn.vue';
import PhotoSingleColumn from '@/components/resume/templates/PhotoSingleColumn.vue';
import ClassicTemplate from '@/components/resume/templates/ClassicTemplate.vue';
import TraditionalTemplate from '@/components/resume/templates/TraditionalTemplate.vue';


export interface ResumeTemplate {
    id: string;
    name: string;
    layoutComponent: Component;
    previewImage: string;
    hasColorPalette?: boolean;
}

export const ATS_TEMPLATES: ResumeTemplate[] = [
    {
        id: 'basic-ats',
        name: 'Basic ATS Template',
        layoutComponent: BasicTemplate,
        previewImage: '/resume-previews/basic-ats-preview.png',
        hasColorPalette: false,
    },
    {
        id: 'modern-ats',
        name: 'Modern ATS Template',
        layoutComponent: ModernTemplate,
        previewImage: '/resume-previews/modern-ats-preview.png',
        hasColorPalette: true,
    },
    {
        id: 'compact',
        name: 'Compact Template',
        layoutComponent: CompactTemplate,
        previewImage: '/resume-previews/compact-preview.png',
        hasColorPalette: false,
    },
    {
        id: 'photo',
        name: 'Photo Template',
        layoutComponent: PhotoTemplate,
        previewImage: '/resume-previews/photo-preview.png',
        hasColorPalette: false,
    },
    {
        id: 'two-column-modern',
        name: 'Two-Column Modern',
        layoutComponent: TwoColumnModern,
        previewImage: '/resume-previews/two-column-modern-preview.png',
        hasColorPalette: true,
    },
    {
        id: 'professional',
        name: 'Professional Template',
        layoutComponent: ProfessionalTemplate,
        previewImage: '/resume-previews/professional-preview.png',
        hasColorPalette: false,
    },
    {
        id: 'photo-two-column',
        name: 'Photo Two-Column',
        layoutComponent: PhotoTwoColumn,
        previewImage: '/resume-previews/photo-two-column-preview.png',
        hasColorPalette: false,
    },
    {
        id: 'photo-single-column',
        name: 'Photo Single-Column',
        layoutComponent: PhotoSingleColumn,
        previewImage: '/resume-previews/photo-single-column-preview.png',
        hasColorPalette: false,
    },
    {
        id: 'classic',
        name: 'Classic Template',
        layoutComponent: ClassicTemplate,
        previewImage: '/resume-previews/classic-preview.png',
        hasColorPalette: false,
    },
    {
        id: 'traditional',
        name: 'Traditional Template',
        layoutComponent: TraditionalTemplate,
        previewImage: '/resume-previews/traditional-preview.png',
        hasColorPalette: false,
    },
];