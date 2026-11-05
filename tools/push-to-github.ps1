# Push a Bish's RV Design System zip to GitHub (onboardianos/bishs-design-system, main).
# Safe by design: it checks the zip before touching the repo, never deletes .git, and stops if too much would be removed.
$ErrorActionPreference = 'Stop'
$Zip     = "C:\Users\mcvic\OneDrive - Bish's RV\Bish's RV Design System (2).zip"
$Repo    = 'https://github.com/onboardianos/bishs-design-system.git'
$Branch  = 'main'
$Work    = 'C:\bishs-push'                       # short path avoids Windows 260-character limits
$Message = 'v2.0_2026-11-05: starter-kit CLAUDE.md, self-locating ds-base.js, floor components, light themes, Wayfinder'

# 1. Check the tools and the zip
foreach ($t in 'git', 'robocopy') { if (-not (Get-Command $t -ErrorAction SilentlyContinue)) { throw "$t is not installed or not on PATH." } }
if (-not (Test-Path -LiteralPath $Zip)) { throw "Zip not found: $Zip  (if OneDrive shows it as cloud-only, right-click > Always keep on this device)" }
if (-not (git config user.name)) { throw 'Set your Git name first:  git config --global user.name "Your Name"' }

# 2. Unzip to a clean folder
if (Test-Path -LiteralPath $Work) { Remove-Item -LiteralPath $Work -Recurse -Force }
$Unzip = Join-Path $Work 'unzip'; $Clone = Join-Path $Work 'repo'
New-Item -ItemType Directory -Path $Unzip | Out-Null
Expand-Archive -LiteralPath $Zip -DestinationPath $Unzip -Force

# 3. Find the design-system root inside the zip (it may be wrapped in a folder)
$Src = Get-ChildItem -LiteralPath $Unzip -Recurse -Filter 'SKILL.md' -File |
  Where-Object { Test-Path -LiteralPath (Join-Path $_.DirectoryName '_ds_bundle.js') } |
  Sort-Object { $_.FullName.Length } | Select-Object -First 1 -ExpandProperty DirectoryName
if (-not $Src) { throw 'No SKILL.md + _ds_bundle.js found in the zip. Wrong zip? Nothing was changed.' }

# 4. Refuse a broken or partial unzip (this is what caused the 7b04d81 clear-out)
$Required = 'SKILL.md', 'CLAUDE.md', 'README.md', 'colors_and_type.css', 'styles.css', '_ds_bundle.js',
  'ui_kits\app-shell', 'ui_kits\spec-ready', 'ui_kits\floor', 'templates\prototype-canvas-shell\ds-base.js',
  'conversions\floor-workspace\index.html', 'documents\bishify-reading-order.md', 'starter-kit\CLAUDE.md'
$Missing = $Required | Where-Object { -not (Test-Path -LiteralPath (Join-Path $Src $_)) }
if ($Missing) { throw "The zip is missing: $($Missing -join ', '). Nothing was changed." }
$Count = (Get-ChildItem -LiteralPath $Src -Recurse -File).Count
Write-Host "Zip OK: $Count files at $Src" -ForegroundColor Green

# 5. Clone the repo
git clone --branch $Branch $Repo $Clone
if ($LASTEXITCODE) { throw 'git clone failed (check you are signed in to GitHub).' }

# 6. Mirror the zip into the clone. Keeps .git; leaves out uploads, snapshots and zips.
robocopy $Src $Clone /MIR /NFL /NDL /NJH /NP `
  /XD .git uploads standalone-src node_modules `
  /XF '*.zip' 'Floor Workspace.html' 'Wayfinder Discovery.html' 'Nexus Design System Viewer.html' .DS_Store | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed (exit $LASTEXITCODE). Nothing was committed." }

# 7. .gitignore (written here in case the zip left out dotfiles)
@'
# Not part of the design system: user uploads, scratch builds, generated exports
uploads/
standalone-src/
Nexus Design System Viewer.html
Floor Workspace.html
Wayfinder Discovery.html
*.zip
.DS_Store
node_modules/
'@ | Set-Content -LiteralPath (Join-Path $Clone '.gitignore') -Encoding utf8

# 8. Review, then commit and push
Set-Location -LiteralPath $Clone
git add -A
$Changes = git status --porcelain
$Deleted = @($Changes | Where-Object { $_ -match '^ ?D' }).Count
Write-Host "Changes: $(@($Changes).Count) files ($Deleted deleted)" -ForegroundColor Cyan
if (-not $Changes) { Write-Host 'Nothing to push: GitHub already matches the zip.'; return }
if ($Deleted -gt 40) {
  $Changes | Where-Object { $_ -match '^ ?D' } | Select-Object -First 40
  if ((Read-Host "$Deleted files would be DELETED from GitHub. Type YES to continue") -ne 'YES') { throw 'Stopped. Nothing was pushed.' }
}
git commit -m $Message
git push origin $Branch
if ($LASTEXITCODE) { throw 'git push failed. Your commit is safe in C:\bishs-push\repo; fix sign-in and run: git push origin main' }
$Sha = git rev-parse HEAD
Write-Host "`nPushed. Commit: $Sha" -ForegroundColor Green
Write-Host 'Paste that commit ID back to Claude so github.md records it.'
