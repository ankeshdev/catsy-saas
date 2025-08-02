#!/bin/bash

echo "🚀 Setting up Dual Repository Push Configuration"
echo "=============================================="

# Check if we have both remotes configured
if git remote get-url origin > /dev/null 2>&1 && git remote get-url second > /dev/null 2>&1; then
    echo "✅ Both remotes are configured:"
    echo "   Origin: $(git remote get-url origin)"
    echo "   Second: $(git remote get-url second)"
else
    echo "❌ Remotes not properly configured"
    exit 1
fi

# Create a custom push script
cat > push-to-both.sh << 'EOF'
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
EOF

chmod +x push-to-both.sh

# Create a git alias for easy pushing
git config alias.push-both '!./push-to-both.sh'

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Usage:"
echo "   • git push-both          # Push to both repositories"
echo "   • ./push-to-both.sh      # Run the push script directly"
echo "   • git push origin main   # Push to origin only"
echo "   • git push second main   # Push to second only"
echo ""
echo "🔧 Authentication Setup:"
echo "1. For origin (ankeshdev/catsy-saas):"
echo "   - Use your GitHub credentials or Personal Access Token"
echo ""
echo "2. For second (devaks-git/catsy-saas-2):"
echo "   - You need collaborator access to this repository"
echo "   - Or use a Personal Access Token with repo access"
echo ""
echo "📝 To set up Personal Access Token:"
echo "1. Go to GitHub → Settings → Developer settings → Personal access tokens"
echo "2. Generate a new token with 'repo' permissions"
echo "3. Use the token as your password when pushing"
echo "" 