#!/bin/bash
set -e

echo "==> Setting up claude-skills..."

# Install gh if missing
if ! command -v gh &>/dev/null; then
  echo "==> Installing gh..."
  brew install gh
fi

# Authenticate if not already
if ! gh auth status &>/dev/null; then
  echo "==> Logging into GitHub..."
  gh auth login
fi

# Back up existing skills if any
if [ -d "$HOME/.claude/skills" ] && [ ! -L "$HOME/.claude/skills" ]; then
  echo "==> Backing up existing ~/.claude/skills to ~/.claude/skills.bak"
  mv "$HOME/.claude/skills" "$HOME/.claude/skills.bak"
fi

# Clone or pull
if [ -d "$HOME/.claude/skills/.git" ]; then
  echo "==> Updating existing repo..."
  git -C "$HOME/.claude/skills" pull
else
  echo "==> Cloning skills repo..."
  git clone https://github.com/mischker/claude-skills.git "$HOME/.claude/skills"
fi

echo ""
echo "✓ Done. Skills installed at ~/.claude/skills"
