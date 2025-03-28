frameworks: ['jasmine', 'karma-typescript'],
files: [
    { pattern: 'src/**/*.ts' },
    { pattern: 'src/**/*.spec.ts' }
],
preprocessors: {
    '**/*.ts': ['karma-typescript']
},
reporters: ['progress', 'karma-typescript'],
browsers: ['Chrome'],
singleRun: true,
karmaTypescriptConfig: {
    tsconfig: './tsconfig.json',
    reports: {
        'html': 'coverage',
        'text-summary': ''
    }
}