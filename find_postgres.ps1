# Find PostgreSQL installation directory
$pgDir = Get-ChildItem "C:\Program Files\PostgreSQL" -ErrorAction SilentlyContinue | 
    Sort-Object -Property Name -Descending | 
    Select-Object -First 1

if ($pgDir) {
    Write-Host "Found PostgreSQL version: $($pgDir.Name)" -ForegroundColor Green
    $psqlPath = Join-Path $pgDir.FullName "bin\psql.exe"
    
    if (Test-Path $psqlPath) {
        Write-Host "PostgreSQL path: $psqlPath" -ForegroundColor Green
        Write-Host "`nTo connect to PostgreSQL, copy and paste this command:" -ForegroundColor Yellow
        Write-Host "& `"$psqlPath`" -U postgres" -ForegroundColor Cyan
    } else {
        Write-Host "psql.exe not found in expected location" -ForegroundColor Red
    }
} else {
    Write-Host "PostgreSQL installation not found in C:\Program Files\PostgreSQL\" -ForegroundColor Red
    Write-Host "Please make sure PostgreSQL is installed correctly" -ForegroundColor Yellow
}
