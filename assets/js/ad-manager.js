/**
 * Ad Manager for Play Mint
 * Ensures ads are only displayed when there's sufficient publisher content
 */

(function() {
    'use strict';
    
    // Check if we're on a game page
    function isGamePage() {
        return window.location.pathname.includes('/games/');
    }
    
    // Check if we're on the secret learning page
    function isLearningPage() {
        return window.location.pathname.includes('secret-learning');
    }
    
    // Check if we're on the privacy policy page
    function isPrivacyPolicyPage() {
        return window.location.pathname.includes('privacy-policy');
    }
    
    // Check if we're on the homepage
    function isHomePage() {
        return window.location.pathname === '/' || 
               window.location.pathname.endsWith('index.html') ||
               window.location.pathname.split('/').filter(Boolean).length === 0;
    }
    
    // Count visible game cards on homepage
    function countVisibleGameCards() {
        const gameCards = document.querySelectorAll('.game-card:not(.ad-card)');
        let visibleCount = 0;
        
        gameCards.forEach(card => {
            const style = window.getComputedStyle(card);
            if (style.display !== 'none' && style.visibility !== 'hidden') {
                visibleCount++;
            }
        });
        
        return visibleCount;
    }
    
    // Validate content sufficiency for homepage
    function hasSufficientHomepageContent() {
        const gameCount = countVisibleGameCards();
        const hasHeaderText = !!document.querySelector('header h1')?.textContent.trim();
        const hasDescriptionText = !!document.querySelector('header p')?.textContent.trim();
        
        return gameCount > 0 && hasHeaderText && hasDescriptionText;
    }
    
    // Validate content sufficiency for game pages
    function hasSufficientGamePageContent() {
        const hasTitle = !!document.querySelector('.game-title')?.textContent.trim();
        const hasBackButton = !!document.querySelector('.back-button');
        const hasGameContainer = !!document.querySelector('.game-container');
        
        return hasTitle && hasBackButton && hasGameContainer;
    }
    
    // Validate content sufficiency for learning page
    function hasSufficientLearningPageContent() {
        const articles = document.querySelectorAll('.learning-article');
        let hasContent = false;
        
        articles.forEach(article => {
            if (article.textContent.trim().length > 100) {
                hasContent = true;
            }
        });
        
        return hasContent;
    }
    
    // Validate content sufficiency for privacy policy page
    function hasSufficientPrivacyPolicyContent() {
        const contentSections = document.querySelectorAll('.game-page h2, .game-page h3, .game-page p, .game-page ul');
        return contentSections.length > 5;
    }
    
    // Initialize ad loading based on content validation
    function initializeAds() {
        // Set a global flag for game content
        window.gameContentLoaded = true;
        
        if (isHomePage()) {
            if (!hasSufficientHomepageContent()) {
                console.log('Insufficient content for homepage ads');
                window.gameContentLoaded = false;
            }
        } else if (isGamePage()) {
            if (!hasSufficientGamePageContent()) {
                console.log('Insufficient content for game page ads');
                window.gameContentLoaded = false;
            }
        } else if (isLearningPage()) {
            if (!hasSufficientLearningPageContent()) {
                console.log('Insufficient content for learning page ads');
                window.gameContentLoaded = false;
            }
        } else if (isPrivacyPolicyPage()) {
            if (!hasSufficientPrivacyPolicyContent()) {
                console.log('Insufficient content for privacy policy ads');
                window.gameContentLoaded = false;
            }
        } else {
            // For other pages, check basic content
            const bodyText = document.body.textContent.trim();
            if (bodyText.length < 100) {
                console.log('Insufficient content for ads on this page');
                window.gameContentLoaded = false;
            }
        }
        
        // Load ads if content is sufficient
        if (window.gameContentLoaded && typeof adsbygoogle !== 'undefined') {
            console.log('Loading ads - sufficient content detected');
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error('Error loading ads:', e);
            }
        }
    }
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAds);
    } else {
        // DOM is already loaded
        initializeAds();
    }
    
    // Export for global access
    window.AdManager = {
        isGamePage: isGamePage,
        isLearningPage: isLearningPage,
        isPrivacyPolicyPage: isPrivacyPolicyPage,
        isHomePage: isHomePage,
        hasSufficientContent: function() {
            if (isHomePage()) return hasSufficientHomepageContent();
            if (isGamePage()) return hasSufficientGamePageContent();
            if (isLearningPage()) return hasSufficientLearningPageContent();
            if (isPrivacyPolicyPage()) return hasSufficientPrivacyPolicyContent();
            return document.body.textContent.trim().length > 100;
        }
    };
})();