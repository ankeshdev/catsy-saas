# 🔄 Dual Repository Push Setup

This guide helps you set up automatic pushing to both GitHub repositories:

1. **Primary**: https://github.com/ankeshdev/catsy-saas.git
2. **Secondary**: https://github.com/devaks-git/catsy-saas-2.git

## 🚀 Quick Setup

### Step 1: Run the Setup Script
```bash
chmod +x setup-dual-push.sh
./setup-dual-push.sh
```

### Step 2: Set Up Authentication

#### Option A: Get Collaborator Access (Recommended)
1. Ask the owner of `devaks-git/catsy-saas-2` to add you as a collaborator
2. Accept the invitation in your GitHub email
3. You'll then have push access

#### Option B: Use Personal Access Token
1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select "repo" permissions
4. Copy the token (you'll only see it once!)
5. Use this token as your password when pushing

### Step 3: Test the Setup
```bash
# Make a small change
echo "# Test commit" >> README.md
git add README.md
git commit -m "Test dual repository push"

# Push to both repositories
./push-to-both.sh
```

## 📋 Available Commands

### Push to Both Repositories
```bash
git push-both          # Using git alias
./push-to-both.sh      # Direct script execution
```

### Push to Individual Repositories
```bash
git push origin main   # Push to ankeshdev/catsy-saas
git push second main   # Push to devaks-git/catsy-saas-2
```

### Check Remote Configuration
```bash
git remote -v          # View all configured remotes
```

## 🔧 Troubleshooting

### Permission Denied Error
```
remote: Permission to devaks-git/catsy-saas-2.git denied to ankeshdev.
```

**Solutions:**
1. **Get collaborator access** to the repository
2. **Use Personal Access Token** as password
3. **Check repository ownership** and permissions

### Authentication Issues
```bash
# Clear stored credentials
git config --global --unset credential.helper

# Set up credential storage
git config --global credential.helper store

# Try pushing again (will prompt for credentials)
git push second main
```

### Repository Not Found
```bash
# Check if remote URL is correct
git remote get-url second

# Update remote URL if needed
git remote set-url second https://github.com/devaks-git/catsy-saas-2.git
```

## 🎯 Workflow

### Daily Development Workflow
1. **Make changes** to your code
2. **Stage changes**: `git add .`
3. **Commit changes**: `git commit -m "Your commit message"`
4. **Push to both**: `git push-both`

### Example Session
```bash
# 1. Make changes to your code
# 2. Stage changes
git add .

# 3. Commit changes
git commit -m "Add new feature: user authentication"

# 4. Push to both repositories
git push-both
```

## 📊 Repository Status

### Primary Repository (ankeshdev/catsy-saas)
- ✅ **Status**: Active and working
- ✅ **Access**: Full control
- ✅ **URL**: https://github.com/ankeshdev/catsy-saas

### Secondary Repository (devaks-git/catsy-saas-2)
- ⚠️ **Status**: Needs authentication setup
- ⚠️ **Access**: Requires collaborator access or token
- ✅ **URL**: https://github.com/devaks-git/catsy-saas-2

## 🔐 Security Best Practices

1. **Use Personal Access Tokens** instead of passwords
2. **Set appropriate token permissions** (repo scope only)
3. **Store tokens securely** (use credential helper)
4. **Rotate tokens regularly** for security

## 📝 Configuration Files

### Git Configuration
```bash
# View current remotes
git remote -v

# View git aliases
git config --get-regexp alias
```

### Scripts Created
- `setup-dual-push.sh` - Setup script
- `push-to-both.sh` - Push script
- Git alias: `push-both`

## 🚀 Next Steps

1. **Complete authentication setup** for the second repository
2. **Test the dual push** with a small commit
3. **Set up automated workflows** if needed
4. **Monitor both repositories** for consistency

---

**Happy coding with dual repository sync! 🎉** 