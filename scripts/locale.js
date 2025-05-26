        // --- I18N Translations ---
        const translations = {
            "zh-CN": {
                "pageTitle": "对话北极星",
                "headerTitleComplete": "对话北极星<br>\"让AI点亮你心中永恒的导航\"",
                "headerTitle": "对话北极星",
                "headerSubtitle": "让AI点亮你心中永恒的导航",
                "tabAiQuantum": "泛AI与量子计算",
                "tabFinance": "泛金融投资",
                "tabChinaEntrepreneurs": "中国代表企业",
                "selectAiQuantumLeader": "选择一位泛AI与量子计算领域北极星",
                "selectFinanceLeader": "选择一位泛金融投资领域北极星",
                "selectChinaEntrepreneursLeader": "选择一位中国代表企业北极星",
                "scrollLeft": "向左滚动",
                "scrollRight": "向右滚动",
                "labelApiEndpoint": "模型接入点:",
                "labelApiKey": "API Key :",
                "placeholderApiKey": "keyxxxx",
                "labelApiModel": "模型选择:",
                "interactWithLeader": "与北极星对话",
                "currentSelectedLeaderPrefix": "当前选择的北极星: ",
                "noLeaderSelected": "无",
                "noLeaderSelectedInitial": "无",
                "placeholderUserQuestion": "请输入您的问题...",
                "btnGeneratePrompt": "1. 生成 Prompt",
                "btnGetAiResponse": "2. 获取 AI 回复",
                "btnCopyToClipboard": "拷贝到粘贴板",
                "generatedPromptTitle": "生成的 Prompt (用于API调用):",
                "aiResponseTitle": "AI 回复:",
                "alertSelectLeaderFirst": "请先选择一位北极星！",
                "alertEnterQuestion": "请输入您的问题！",
                "alertEnterApiUrl": "请输入API镜像站基础URL！",
                "alertEnterApiKey": "请输入API Key!",
                "alertNoPrompt": "请先点击“1. 生成 Prompt”来准备对话内容。",
                "apiErrorOccurred": "请求API时出错: ",
                "apiErrorCheckConsole": "\n\n请检查: \n1. API URL是否正确且可访问。\n2. 是否支持CORS跨域请求。\n3. 网络连接是否正常。\n4. API Key是否正确 (如果需要)。\n5. 控制台(F12)查看详细错误信息。",
                "geminiApiErrorCheckConsole": "\n\n请检查: \n1. Gemini API的URL/Endpoint是否正确且可访问 \n2. API Key是否正确且有效，并以正确的方式（Header或URL参数）传递。\n3. 网络连接是否正常。\n4. 请求体 (RequestBody) 是否符合Gemini API的要求。\n5. 控制台(F12)查看详细错误信息。",
                "apiNoValidResponse": "未能从API获取有效回复。请检查API响应结构。",
                "copiedToClipboard": "已拷贝到粘贴板！",
                "contentTypePrompt": "Prompt",
                "contentTypeAiResponse": "AI 回复",
                "copyFailed": "无法拷贝到粘贴板: ",
                "copyFailedHint": "\n\n提示：\n1. 确保页面是通过 HTTPS 加载的 (本地 localhost 通常也可以)。\n2. 浏览器可能需要用户交互 (如点击) 才能执行复制操作。\n3. 检查浏览器控制台是否有权限相关的错误信息。\n4. 您可以尝试手动选中内容并按 Ctrl+C (或 Cmd+C) 复制。",
                "nothingToCopy": "没有可拷贝的内容。请先生成Prompt或获取AI回复。",
                "labelContribution": "贡献:",
                "labelField": "领域:",
                "labelRemarks": "备注:",
                "modelDeepSeekV3": "DeepSeek-V3",
                "modelGeminiFlash": "Gemini-2.5-Flash",
                "modelGpt4oMini": "gpt-4o-mini",
                "promptBaseRemarksNone": "无特定备注，请基于其贡献和领域推断其核心思维模式。",
                "promptBaseRemarksWith": "备注中提到的特点 (${remarks}) 和",
                "promptBackgroundSetting": "背景设定:",
                "promptYouAre": "你是",
                "promptBasedOnPublicContributions": "根据公开的贡献、专长领域和已知行事风格/理念，从第一性原理出发，深入思考并回答以下用户提出的问题。",
                "promptCoreInfoFor": "的核心信息:",
                "promptMainContributions": "主要贡献",
                "promptExpertise": "专业领域",
                "promptKeyRemarksFeatures": "关键备注/特点",
                "promptThinkingFrameworkGuidance": "思考框架指引 (以 ${name} 思考时请遵循)：",
                "promptFollowWhenThinkingAs": "以 ${name} 思考时请遵循",
                "promptFirstPrinciplesThinking": "第一性原理 (First Principles Thinking)",
                "promptFirstPrinciplesDetail": "将问题分解到最基本的、不容置疑的真实要素。避免类比推理或依赖普遍接受的假设，除非这些假设已经过严格验证。",
                "promptDomainExpertise": "领域专长",
                "promptDomainExpertiseDetail1": "运用你在 ${field} 的深厚知识。",
                "promptDomainExpertiseDetail2": "如果问题跨领域，尝试从你的核心领域视角寻找切入点或提出独到见解。",
                "promptCorePhilosophyDrivingForce": "核心理念/驱动力",
                "promptCorePhilosophyDetail1": "结合 ${name} 的 ${remarksSection} 已知贡献，思考其做决策、看待问题时的核心驱动力是什么（例如，技术乐观主义、风险厌恶、社会责任、效率至上、创新驱动、长期主义等）。",
                "promptProblemAnalysis": "问题剖析",
                "promptProblemAnalysisDetail": "深入分析用户问题的本质，探讨其背后的深层原因和可能的多种解读。",
                "promptSolutionInsight": "解决方案/洞察",
                "promptSolutionInsightDetail1": "基于以上思考，提出具有 ${name} 特色的、富有洞察力的、可能具有前瞻性的观点、分析或解决方案框架。",
                "promptSolutionInsightDetail2": "如果适用，可以指出潜在的挑战、机遇或需要进一步探索的方向。",
                "promptLanguageStyle": "语言风格",
                "promptLanguageStyleDetail1": "尝试模仿 ${name} 可能的沟通风格（例如，直接、富有远见、严谨、强调数据、关注伦理等）。",
                "promptLanguageStyleDetail2": "如果其风格未知，则采用清晰、专业、有深度的表达。",
                "promptUserQuestion": "用户问题:",
                "promptAs": "请你作为",
                "promptReplyInChinese": "开始你的思考和中文回复:",
                "promptReplyInEnglish": "开始你的思考和英文回复:",
            },
            "en": {
                "pageTitle": "Talk with North Stars",
                "headerTitleComplete": "Talk with North Stars<br>\"Let AI Illuminate the Eternal Navigation in Your Heart\"",
                "headerTitle": "Talk with North Stars",
                "headerSubtitle": "Let AI Illuminate the Eternal Navigation in Your Heart",
                "tabAiQuantum": "General AI & Quantum Computing",
                "tabFinance": "General Finance & Investment",
                "tabChinaEntrepreneurs": "Representative Chinese Enterprises",
                "selectAiQuantumLeader": "Select a North Star in General AI & Quantum Computing",
                "selectFinanceLeader": "Select a North Star in General Finance & Investment",
                "selectChinaEntrepreneursLeader": "Select a North Star from Representative Chinese Enterprises",
                "scrollLeft": "Scroll Left",
                "scrollRight": "Scroll Right",
                "labelApiEndpoint": "Model Endpoint:",
                "labelApiKey": "API Key :",
                "placeholderApiKey": "keyxxxx",
                "labelApiModel": "Model Selection:",
                "interactWithLeader": "Talk with North Star",
                "currentSelectedLeaderPrefix": "Currently Selected North Star: ",
                "noLeaderSelected": "None",
                "noLeaderSelectedInitial": "None",
                "placeholderUserQuestion": "Please enter your question...",
                "btnGeneratePrompt": "1. Generate Prompt",
                "btnGetAiResponse": "2. Get AI Response",
                "btnCopyToClipboard": "Copy to Clipboard",
                "generatedPromptTitle": "Generated Prompt (for API call):",
                "aiResponseTitle": "AI Response:",
                "alertSelectLeaderFirst": "Please select a North Star first!",
                "alertEnterQuestion": "Please enter your question!",
                "alertEnterApiUrl": "Please enter the API mirror base URL!",
                "alertEnterApiKey": "Please enter API Key!",
                "alertNoPrompt": "Please click \"1. Generate Prompt\" first to prepare the talk content.",
                "apiErrorOccurred": "Error requesting API: ",
                "apiErrorCheckConsole": "\n\nPlease check: \n1. If the API URL is correct and accessible.\n2. If CORS cross-origin requests are supported.\n3. If the network connection is normal.\n4. If the API Key is correct (if required).\n5. Check the console (F12) for detailed error messages.",
                "geminiApiErrorCheckConsole": "\n\nPlease check: \n1. If the Gemini API URL/Endpoint is correct and accessible.\n2. If the API Key is correct and valid, and passed correctly (Header or URL parameter).\n3. If the network connection is normal.\n4. If the request body (RequestBody) meets Gemini API requirements.\n5. Check the console (F12) for detailed error messages.",
                "apiNoValidResponse": "Failed to get a valid response from the API. Please check the API response structure.",
                "copiedToClipboard": "Copied to clipboard!",
                "contentTypePrompt": "Prompt",
                "contentTypeAiResponse": "AI Response",
                "copyFailed": "Failed to copy to clipboard: ",
                "copyFailedHint": "\n\nHint:\n1. Ensure the page is loaded via HTTPS (localhost usually works too).\n2. The browser might require user interaction (like a click) to perform the copy operation.\n3. Check the browser console for any permission-related error messages.\n4. You can try manually selecting the content and pressing Ctrl+C (or Cmd+C) to copy.",
                "nothingToCopy": "Nothing to copy. Please generate a Prompt or get an AI response first.",
                "labelContribution": "Contribution:",
                "labelField": "Field:",
                "labelRemarks": "Remarks:",
                "modelDeepSeekV3": "DeepSeek-V3",
                "modelGeminiFlash": "Gemini-2.5-Flash",
                "modelGpt4oMini": "gpt-4o-mini",
                "promptBaseRemarksNone": "No specific remarks, please infer their core thinking model based on their contributions and field.",
                "promptBaseRemarksWith": "The characteristics mentioned in the remarks (${remarks}) and",
                "promptBackgroundSetting": "Background Setting:",
                "promptYouAre": "You are",
                "promptBasedOnPublicContributions": "Based on public contributions, expertise, and known style/philosophy, think deeply from first principles and answer the user's question below.",
                "promptCoreInfoFor": "'s Core Information:",
                "promptMainContributions": "Main Contributions",
                "promptExpertise": "Professional Field",
                "promptKeyRemarksFeatures": "Key Remarks/Features",
                "promptThinkingFrameworkGuidance": "Thinking Framework Guide (Follow when thinking as ${name}):",
                "promptFollowWhenThinkingAs": "Follow when thinking as ${name}",
                "promptFirstPrinciplesThinking": "First Principles Thinking",
                "promptFirstPrinciplesDetail": "Break down the problem into its most fundamental, indisputable truths. Avoid analogical reasoning or relying on commonly accepted assumptions unless they have been rigorously validated.",
                "promptDomainExpertise": "Domain Expertise",
                "promptDomainExpertiseDetail1": "Utilize your deep knowledge in ${field}.",
                "promptDomainExpertiseDetail2": "If the question spans multiple domains, try to find entry points or offer unique insights from your core domain perspective.",
                "promptCorePhilosophyDrivingForce": "Core Philosophy/Driving Force",
                "promptCorePhilosophyDetail1": "Considering ${name}'s ${remarksSection} known contributions, reflect on their core driving force when making decisions and viewing problems (e.g., technological optimism, risk aversion, social responsibility, efficiency-first, innovation-driven, long-termism, etc.).",
                "promptProblemAnalysis": "Problem Analysis",
                "promptProblemAnalysisDetail": "Deeply analyze the essence of the user's question, exploring its underlying causes and possible multiple interpretations.",
                "promptSolutionInsight": "Solution/Insight",
                "promptSolutionInsightDetail1": "Based on the above thinking, propose viewpoints, analyses, or solution frameworks that are characteristic of ${name}, insightful, and potentially forward-looking.",
                "promptSolutionInsightDetail2": "If applicable, point out potential challenges, opportunities, or directions for further exploration.",
                "promptLanguageStyle": "Language Style",
                "promptLanguageStyleDetail1": "Attempt to mimic ${name}'s likely communication style (e.g., direct, visionary, rigorous, data-driven, ethics-focused, etc.).",
                "promptLanguageStyleDetail2": "If their style is unknown, use clear, professional, and in-depth expression.",
                "promptUserQuestion": "User Question:",
                "promptAs": "As",
                "promptReplyInChinese": "begin your thinking and reply in Chinese:",
                "promptReplyInEnglish": "begin your thinking and reply in English:",
            }
        };
        let currentLang = 'zh-CN'; // Default language

        function setLanguage(lang) {
            currentLang = lang;
            document.documentElement.lang = currentLang;
            document.title = translations[currentLang].pageTitle;
            localStorage.setItem('preferredLang', lang); // Save preference

            document.querySelectorAll('[data-i18n-key]').forEach(el => {
                const key = el.dataset.i18nKey;
                const target = el.dataset.i18nTarget || 'textContent'; // Default to textContent
                let translation = translations[currentLang][key] || key; // Fallback to key if no translation

                if (target === 'innerHTML') {
                    el.innerHTML = translation;
                } else if (target === 'placeholder') {
                    el.placeholder = translation;
                } else if (target === 'aria-label') {
                    el.setAttribute('aria-label', translation);
                } else {
                    el.textContent = translation;
                }
            });
            
            // Update dynamic elements that need re-translation
            populateLeaders(); // This will now use translated labels AND translated data content
            updateModelSelectByEndpoint(document.getElementById('apiEndpoint').value); // Re-populate models with translated labels

            // Update selected leader display if "None"
            const selectedLeaderNameEl = document.getElementById('selectedLeaderName');
            if (!currentSelectedLeader) {
                selectedLeaderNameEl.textContent = translations[currentLang].noLeaderSelected;
            }
        }    
