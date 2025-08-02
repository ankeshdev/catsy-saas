#!/bin/bash

echo "🚀 Pushing to both repositories..."

# Push to origin (ankeshdev/catsy-saas)
echo "📤 Pushing to origin (ankeshdev/catsy-saas)..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to origin"
else
    echo "❌ Failed to push to origin"
    exit 1
fi

# Push to second (devaks-git/catsy-saas-2)
echo "📤 Pushing to second (devaks-git/catsy-saas-2)..."
git push second main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to second repository"
else
    echo "❌ Failed to push to second repository"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "1. Make sure you have access to devaks-git/catsy-saas-2"
    echo "2. Check your GitHub authentication"
    echo "3. Try using a Personal Access Token"
    exit 1
fi

echo ""
echo "🎉 Successfully pushed to both repositories!"
echo "   • Origin: https://github.com/ankeshdev/catsy-saas"
echo "   • Second: https://github.com/devaks-git/catsy-saas-2"
