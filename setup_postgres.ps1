# Find PostgreSQL installation
$pgPath = Get-ChildItem "C:\Program Files\PostgreSQL" -ErrorAction SilentlyContinue | 
    Sort-Object -Property Name -Descending | 
    Select-Object -First 1 -ExpandProperty FullName

if (-not $pgPath) {
    Write-Host "PostgreSQL installation not found in C:\Program Files\PostgreSQL\" -ForegroundColor Red
    Write-Host "Please make sure PostgreSQL is installed" -ForegroundColor Red
    exit 1
}

$binPath = Join-Path $pgPath "bin"
Write-Host "Found PostgreSQL at: $binPath" -ForegroundColor Green

# Add to current session PATH
$env:Path = "$binPath;$env:Path"

# Prompt for new password
$password = Read-Host "Enter new password for postgres user" -AsSecureString
$passwordText = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

# Update postgres password
$env:PGPASSWORD = "postgres"  # Default postgres password
Write-Host "Attempting to set new password..." -ForegroundColor Yellow
$result = & "$binPath\psql" -U postgres -c "ALTER USER postgres WITH PASSWORD '$passwordText';" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Password successfully updated!" -ForegroundColor Green
    
    # Create database
    Write-Host "Creating database 'real_estate_db'..." -ForegroundColor Yellow
    $env:PGPASSWORD = $passwordText
    & "$binPath\psql" -U postgres -c "CREATE DATABASE real_estate_db;"
    
    # Update Django settings
    $settingsPath = ".\real_estate_backend\settings.py"
    if (Test-Path $settingsPath) {
        $settings = Get-Content $settingsPath -Raw
        $settings = $settings -replace "'PASSWORD': '.*?'", "'PASSWORD': '$passwordText'"
        Set-Content $settingsPath $settings
        Write-Host "Django settings updated!" -ForegroundColor Green
    }
} else {
    Write-Host "Failed to set password. Error: $result" -ForegroundColor Red
    Write-Host "Try running PostgreSQL command prompt as administrator and set password manually" -ForegroundColor Yellow
}
