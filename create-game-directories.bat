@echo off
setlocal enabledelayedexpansion

if "%~1"=="" (
    echo Usage: %0 ^<game-name^>
    echo Example: %0 "Puzzle Quest"
    exit /b 1
)

set "GAME_NAME=%~1"
set "FORMATTED_NAME=%GAME_NAME: =-%"
set "FORMATTED_NAME=%FORMATTED_NAME:A=a%"
set "FORMATTED_NAME=%FORMATTED_NAME:B=b%"
set "FORMATTED_NAME=%FORMATTED_NAME:C=c%"
set "FORMATTED_NAME=%FORMATTED_NAME:D=d%"
set "FORMATTED_NAME=%FORMATTED_NAME:E=e%"
set "FORMATTED_NAME=%FORMATTED_NAME:F=f%"
set "FORMATTED_NAME=%FORMATTED_NAME:G=g%"
set "FORMATTED_NAME=%FORMATTED_NAME:H=h%"
set "FORMATTED_NAME=%FORMATTED_NAME:I=i%"
set "FORMATTED_NAME=%FORMATTED_NAME:J=j%"
set "FORMATTED_NAME=%FORMATTED_NAME:K=k%"
set "FORMATTED_NAME=%FORMATTED_NAME:L=l%"
set "FORMATTED_NAME=%FORMATTED_NAME:M=m%"
set "FORMATTED_NAME=%FORMATTED_NAME:N=n%"
set "FORMATTED_NAME=%FORMATTED_NAME:O=o%"
set "FORMATTED_NAME=%FORMATTED_NAME:P=p%"
set "FORMATTED_NAME=%FORMATTED_NAME:Q=q%"
set "FORMATTED_NAME=%FORMATTED_NAME:R=r%"
set "FORMATTED_NAME=%FORMATTED_NAME:S=s%"
set "FORMATTED_NAME=%FORMATTED_NAME:T=t%"
set "FORMATTED_NAME=%FORMATTED_NAME:U=u%"
set "FORMATTED_NAME=%FORMATTED_NAME:V=v%"
set "FORMATTED_NAME=%FORMATTED_NAME:W=w%"
set "FORMATTED_NAME=%FORMATTED_NAME:X=x%"
set "FORMATTED_NAME=%FORMATTED_NAME:Y=y%"
set "FORMATTED_NAME=%FORMATTED_NAME:Z=z%"

echo Creating directory structure for game: %GAME_NAME%
echo Formatted name: %FORMATTED_NAME%

mkdir "assets\images\games\%FORMATTED_NAME%\200x200" 2>nul
mkdir "assets\images\games\%FORMATTED_NAME%\300x200" 2>nul
mkdir "assets\images\games\%FORMATTED_NAME%\500x300" 2>nul
mkdir "assets\images\games\%FORMATTED_NAME%\800x450" 2>nul

if exist "assets\images\games\%FORMATTED_NAME%" (
    echo Successfully created directory structure for %GAME_NAME%
    echo Directories created:
    echo   - assets\images\games\%FORMATTED_NAME%\200x200
    echo   - assets\images\games\%FORMATTED_NAME%\300x200
    echo   - assets\images\games\%FORMATTED_NAME%\500x300
    echo   - assets\images\games\%FORMATTED_NAME%\800x450
) else (
    echo Failed to create directory structure for %GAME_NAME%
    exit /b 1
)

echo.
echo Next steps:
echo 1. Place your WebP images in each directory with the naming convention:
echo    - [game-name]200.webp (for 200x200 directory)
echo    - [game-name]300200.webp (for 300x200 directory)
echo    - [game-name]500300.webp (for 500x300 directory)
echo    - [game-name]800450.webp (for 800x450 directory)
echo 2. Update index.html with a new game card for %GAME_NAME%
echo 3. Use the createGameCard() JavaScript function to easily generate game cards