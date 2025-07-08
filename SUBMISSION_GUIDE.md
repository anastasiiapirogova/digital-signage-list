# Submission Guide

Welcome to SignageList! This guide will help you submit new digital signage products or update existing ones.

## 🤝 Transparent Curation Process

We accept submissions through **GitHub Issues** to maintain a transparent curation process. This means:

- **Public Review**: All submissions are visible to the community
- **Open Discussion**: Anyone can comment on and review submissions
- **Community Input**: The community can help verify information and suggest improvements
- **Trackable History**: All changes and decisions are publicly documented
- **Quality Assurance**: Multiple eyes help ensure accuracy and completeness

This approach ensures that our digital signage directory remains trustworthy, accurate, and community-driven.

## 📝 Adding a New Product

1. Create a free GitHub account (if you don't have one)
2. Go to [Create an Issue](https://github.com/514sid/digital-signage-list/issues)
3. Click "New Issue"
4. Select the "🚀 Suggest a New Product" template
5. Fill out all required fields with accurate information

## 🔄 Updating an Existing Product

1. Create a free GitHub account (if you don't have one)
2. Create a new issue with the title: `[Update] <Product Name>`
3. Describe what information needs to be updated
4. Provide the new/corrected information

## 🔧 Making Pull Requests

If you would like to make a pull request to add a new product or update existing data:

1. Fork the repository
2. Make your changes to the product data files
3. **Important**: Run `npx signagelist build` to rebuild the product list for the frontend
4. Commit your changes including the rebuilt files
5. Submit your pull request

This ensures that the frontend will display your changes correctly when the pull request is merged.