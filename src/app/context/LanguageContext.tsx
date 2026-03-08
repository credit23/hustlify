import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "fr" | "ar";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
  dir: "ltr",
});

export function useLanguage() {
  return useContext(LanguageContext);
}

// ─── Translations ────────────────────────────────────────
const translations: Record<string, Record<Lang, string>> = {
  // ── Navbar ──
  "nav.sponsors": { en: "Sponsors", fr: "Sponsors", ar: "الرعاة" },
  "nav.whyUs": { en: "Why Us?", fr: "Pourquoi Nous ?", ar: "لماذا نحن؟" },
  "nav.login": { en: "Login", fr: "Connexion", ar: "تسجيل الدخول" },
  "nav.signup": { en: "Sign Up", fr: "S'inscrire", ar: "إنشاء حساب" },
  "nav.contact": { en: "Contact", fr: "Contact", ar: "اتصل بنا" },

  // ── Footer ──
  "footer.home": { en: "Home", fr: "Accueil", ar: "الرئيسية" },
  "footer.contactUs": { en: "Contact Us", fr: "Contactez-nous", ar: "اتصل بنا" },
  "footer.sponsors": { en: "Sponsors", fr: "Sponsors", ar: "الرعاة" },
  "footer.followUs": { en: "Follow Us", fr: "Suivez-nous", ar: "تابعنا" },
  "footer.location": { en: "Algeria, Algiers", fr: "Algérie, Alger", ar: "الجزائر، العاصمة" },
  "footer.rights": { en: "© 2026 Hustlify® Global LLC · All Rights Reserved", fr: "© 2026 Hustlify® Global LLC · Tous droits réservés", ar: "© 2026 Hustlify® Global LLC · جميع الحقوق محفوظة" },

  // ── Landing Page ──
  "landing.badge": { en: "Algeria's #1 Talent Marketplace", fr: "La 1ère plateforme de talents en Algérie", ar: "المنصة رقم 1 للمواهب في الجزائر" },
  "landing.heroTitle1": { en: "Building The Future of Hiring in", fr: "Construire le futur du recrutement en", ar: "نبني مستقبل التوظيف في" },
  "landing.heroTitle2": { en: "Algeria", fr: "Algérie", ar: "الجزائر" },
  "landing.heroDesc": { en: "Hustlify connects companies and talent across Algeria through a fast, modern and reliable hiring platform", fr: "Hustlify connecte entreprises et talents à travers l'Algérie via une plateforme de recrutement rapide, moderne et fiable", ar: "هسلفاي تربط الشركات والمواهب عبر الجزائر من خلال منصة توظيف سريعة وحديثة وموثوقة" },
  "landing.searchPlaceholder": { en: "Search skills, domains...", fr: "Rechercher compétences, domaines...", ar: "...ابحث عن مهارات، مجالات" },
  "landing.wilayaPlaceholder": { en: "Wilaya", fr: "Wilaya", ar: "الولاية" },
  "landing.keywordsPlaceholder": { en: "Keywords, Domain...", fr: "Mots-clés, Domaine...", ar: "...كلمات، مجال" },
  "landing.search": { en: "Search", fr: "Rechercher", ar: "بحث" },
  "landing.employee": { en: "Employee", fr: "Employé", ar: "موظف" },
  "landing.job": { en: "Job", fr: "Emploi", ar: "وظيفة" },
  "landing.findTalent": { en: "Find Talent", fr: "Trouver un talent", ar: "ابحث عن موهبة" },
  "landing.findJobs": { en: "Find Jobs", fr: "Trouver un emploi", ar: "ابحث عن وظيفة" },
  "landing.freeToJoin": { en: "Free to Join", fr: "Inscription gratuite", ar: "التسجيل مجاني" },
  "landing.wilayas": { en: "69 Wilayas", fr: "69 Wilayas", ar: "69 ولاية" },
  "landing.verifiedProfiles": { en: "Verified Profiles", fr: "Profils vérifiés", ar: "ملفات موثقة" },
  "landing.domains": { en: "Domains", fr: "Domaines", ar: "مجالات" },
  "landing.clients": { en: "Clients", fr: "Clients", ar: "عملاء" },
  "landing.employees": { en: "Employees", fr: "Employés", ar: "موظفون" },
  "landing.missionTitle": { en: "Our", fr: "Notre", ar: "مهمتنا" },
  "landing.mission": { en: "Mission", fr: "Mission", ar: "" },
  "landing.missionDesc": { en: "Our mission is to simplify hiring and job searching in Algeria by connecting employers with job seekers, while also empowering independent workers to easily find new opportunities and grow their businesses.", fr: "Notre mission est de simplifier le recrutement et la recherche d'emploi en Algérie en connectant les employeurs avec les chercheurs d'emploi, tout en permettant aux travailleurs indépendants de trouver facilement de nouvelles opportunités.", ar: "مهمتنا هي تبسيط التوظيف والبحث عن عمل في الجزائر من خلال ربط أصحاب العمل بالباحثين عن عمل، مع تمكين العمال المستقلين من إيجاد فرص جديدة بسهولة." },
  "landing.theProblem": { en: "The Problem", fr: "Le Problème", ar: "المشكلة" },
  "landing.problemDesc": { en: "Hiring in Algeria can be", fr: "Le recrutement en Algérie peut être", ar: "التوظيف في الجزائر يمكن أن يكون" },
  "landing.slow": { en: "slow, fragmented", fr: "lent, fragmenté", ar: "بطيئاً ومجزأً" },
  "landing.and": { en: "and", fr: "et", ar: "و" },
  "landing.inefficient": { en: "inefficient", fr: "inefficace", ar: "غير فعال" },
  "landing.problemDescEnd": { en: "Businesses struggle to find qualified candidates, while talented professionals miss out on real opportunities", fr: "Les entreprises peinent à trouver des candidats qualifiés, tandis que les professionnels talentueux passent à côté de vraies opportunités", ar: "تكافح الشركات للعثور على مرشحين مؤهلين، بينما يفوت المحترفون الموهوبون فرصاً حقيقية" },
  "landing.solution": { en: "How Hustlify Changes That", fr: "Comment Hustlify change la donne", ar: "كيف يغير هسلفاي ذلك" },
  "landing.solutionDesc": { en: "Hustlify brings companies and candidates together in one streamlined platform searchable by", fr: "Hustlify réunit entreprises et candidats sur une seule plateforme organisée par", ar: "هسلفاي يجمع الشركات والمرشحين في منصة واحدة قابلة للبحث حسب" },
  "landing.domain": { en: "Domain", fr: "Domaine", ar: "المجال" },
  "landing.wilaya": { en: "Wilaya", fr: "Wilaya", ar: "الولاية" },
  "landing.solutionDescEnd": { en: "Making hiring faster, simpler and more transparent", fr: "Rendant le recrutement plus rapide, simple et transparent", ar: "مما يجعل التوظيف أسرع وأبسط وأكثر شفافية" },
  "landing.howItWorks": { en: "How it", fr: "Comment ça", ar: "كيف" },
  "landing.works": { en: "Works", fr: "Marche", ar: "يعمل" },
  "landing.howItWorksDesc": { en: "Get started in 3 simple steps", fr: "Commencez en 3 étapes simples", ar: "ابدأ في 3 خطوات بسيطة" },
  "landing.step1Title": { en: "Create a Profile", fr: "Créer un profil", ar: "أنشئ ملفك" },
  "landing.step1Desc": { en: "Sign in and complete your profile with ease", fr: "Connectez-vous et complétez votre profil facilement", ar: "سجل الدخول وأكمل ملفك بسهولة" },
  "landing.step2Title": { en: "Search or Post Jobs", fr: "Chercher ou publier des offres", ar: "ابحث أو انشر وظائف" },
  "landing.step2Desc": { en: "Find the right jobs or talents by Wilaya and Domain", fr: "Trouvez les bons emplois ou talents par Wilaya et Domaine", ar: "ابحث عن الوظائف أو المواهب حسب الولاية والمجال" },
  "landing.step3Title": { en: "Connect and Grow", fr: "Connecter et grandir", ar: "تواصل وتطور" },
  "landing.step3Desc": { en: "Chat, interview and hire your next opportunity", fr: "Discutez, passez des entretiens et recrutez", ar: "تحدث، أجرِ مقابلات ووظف فرصتك القادمة" },
  "landing.topTalent": { en: "Top Talent in Algeria", fr: "Top Talents en Algérie", ar: "أفضل المواهب في الجزائر" },
  "landing.topTalentDesc": { en: "Highly rated professionals ready to work", fr: "Professionnels hautement notés prêts à travailler", ar: "محترفون ذوو تقييم عالٍ مستعدون للعمل" },
  "landing.viewAll": { en: "View all", fr: "Voir tout", ar: "عرض الكل" },
  "landing.reviews": { en: "reviews", fr: "avis", ar: "تقييمات" },
  "landing.verifiedTalents": { en: "Verified Talents", fr: "Talents vérifiés", ar: "مواهب موثقة" },
  "landing.avgRating": { en: "Avg Rating", fr: "Note moyenne", ar: "التقييم المتوسط" },
  "landing.trustedBy": { en: "Trusted by Algeria's Top Companies", fr: "Approuvé par les meilleures entreprises d'Algérie", ar: "موثوق من قبل أفضل الشركات في الجزائر" },
  "landing.ctaTitle": { en: "Ready to Transform Your Hiring?", fr: "Prêt à transformer votre recrutement ?", ar: "مستعد لتحويل عملية التوظيف؟" },
  "landing.ctaDesc": { en: "Join 2,000+ clients and 1,500+ professionals already growing on Hustlify", fr: "Rejoignez plus de 2 000 clients et 1 500 professionnels qui grandissent déjà sur Hustlify", ar: "انضم إلى أكثر من 2000 عميل و1500 محترف يتطورون بالفعل على هسلفاي" },
  "landing.getStarted": { en: "Get Started Free", fr: "Commencer Gratuitement", ar: "ابدأ مجاناً" },
  "landing.learnMore": { en: "Learn More", fr: "En Savoir Plus", ar: "اعرف المزيد" },

  // ── Why Us Page ──
  "whyUs.badge": { en: "Algeria's #1 Talent Marketplace", fr: "La 1ère plateforme de talents en Algérie", ar: "المنصة رقم 1 للمواهب في الجزائر" },
  "whyUs.heroTitle1": { en: "Why Choose", fr: "Pourquoi Choisir", ar: "لماذا تختار" },
  "whyUs.heroTitle2": { en: "Hustlify?", fr: "Hustlify ?", ar: "هسلفاي؟" },
  "whyUs.heroDesc": { en: "We built the platform that Algeria's professionals and businesses needed but never had. Transparent, secure, and designed to grow careers and companies.", fr: "Nous avons créé la plateforme dont les professionnels et entreprises algériens avaient besoin. Transparente, sécurisée et conçue pour faire croître carrières et entreprises.", ar: "بنينا المنصة التي يحتاجها المحترفون والشركات الجزائرية. شفافة وآمنة ومصممة لتنمية المسارات المهنية والشركات." },
  "whyUs.getStarted": { en: "Get Started Free", fr: "Commencer Gratuitement", ar: "ابدأ مجاناً" },
  "whyUs.talkToUs": { en: "Talk to Us", fr: "Nous Contacter", ar: "تواصل معنا" },
  "whyUs.verified": { en: "Verified", fr: "Vérifié", ar: "موثق" },
  "whyUs.secure": { en: "100% Secure", fr: "100% Sécurisé", ar: "آمن 100%" },
  "whyUs.verifiedProfessionals": { en: "Verified Professionals", fr: "Professionnels vérifiés", ar: "محترفون موثقون" },
  "whyUs.happyClients": { en: "Happy Clients", fr: "Clients satisfaits", ar: "عملاء سعداء" },
  "whyUs.industryDomains": { en: "Industry Domains", fr: "Domaines d'industrie", ar: "مجالات صناعية" },
  "whyUs.wilayasCovered": { en: "Wilayas Covered", fr: "Wilayas couvertes", ar: "ولايات مغطاة" },
  "whyUs.averageRating": { en: "Average Rating", fr: "Note moyenne", ar: "التقييم المتوسط" },
  "whyUs.enterprisesTrustUs": { en: "Enterprises Trust Us", fr: "Entreprises nous font confiance", ar: "مؤسسات تثق بنا" },
  "whyUs.builtForEveryRole": { en: "Built for", fr: "Conçu pour", ar: "مصمم لكل" },
  "whyUs.everyRole": { en: "Every Role", fr: "Chaque Rôle", ar: "الأدوار" },
  "whyUs.everyRoleDesc": { en: "Whether you're a freelancer, client, or enterprise — Hustlify has the tools you need", fr: "Que vous soyez freelance, client ou entreprise — Hustlify a les outils qu'il vous faut", ar: "سواء كنت مستقلاً أو عميلاً أو مؤسسة — هسلفاي لديه الأدوات التي تحتاجها" },
  "whyUs.tabEmployee": { en: "Employees & Freelancers", fr: "Employés & Freelances", ar: "موظفون ومستقلون" },
  "whyUs.tabEmployeeShort": { en: "Employees", fr: "Employés", ar: "موظفون" },
  "whyUs.tabClient": { en: "Clients", fr: "Clients", ar: "عملاء" },
  "whyUs.tabEnterprise": { en: "Enterprises", fr: "Entreprises", ar: "مؤسسات" },
  "whyUs.joinEmployee": { en: "Join as an Employee", fr: "Rejoindre en tant qu'employé", ar: "انضم كموظف" },
  "whyUs.startHiring": { en: "Start Hiring", fr: "Commencer à recruter", ar: "ابدأ التوظيف" },
  "whyUs.createEnterprise": { en: "Create Enterprise Account", fr: "Créer un compte entreprise", ar: "إنشاء حساب مؤسسة" },
  // Employee benefits
  "whyUs.emp.findJobs": { en: "Find Jobs Fast", fr: "Trouvez des emplois rapidement", ar: "ابحث عن عمل بسرعة" },
  "whyUs.emp.findJobsDesc": { en: "Get matched with top clients and enterprises across Algeria in minutes, not weeks.", fr: "Soyez mis en relation avec les meilleurs clients et entreprises en Algérie en minutes, pas en semaines.", ar: "تطابق مع أفضل العملاء والمؤسسات عبر الجزائر في دقائق وليس أسابيع." },
  "whyUs.emp.reputation": { en: "Build Your Reputation", fr: "Construisez votre réputation", ar: "ابنِ سمعتك" },
  "whyUs.emp.reputationDesc": { en: "Collect reviews and earn verified badges to stand out from thousands of professionals.", fr: "Collectez des avis et gagnez des badges vérifiés pour vous démarquer parmi des milliers de professionnels.", ar: "اجمع التقييمات واحصل على شارات موثقة لتتميز بين آلاف المحترفين." },
  "whyUs.emp.grow": { en: "Grow Your Career", fr: "Développez votre carrière", ar: "طور مسيرتك المهنية" },
  "whyUs.emp.growDesc": { en: "Access 70+ domains and upskilling resources to level up your professional journey.", fr: "Accédez à plus de 70 domaines et ressources de formation pour faire évoluer votre parcours professionnel.", ar: "اوصل لأكثر من 70 مجالاً وموارد تطوير لترتقي في مسيرتك المهنية." },
  "whyUs.emp.anywhere": { en: "Work Anywhere in Algeria", fr: "Travaillez partout en Algérie", ar: "اعمل في أي مكان في الجزائر" },
  "whyUs.emp.anywhereDesc": { en: "Connect with opportunities across all 69 wilayas, locally or remotely.", fr: "Connectez-vous aux opportunités dans les 69 wilayas, localement ou à distance.", ar: "تواصل مع الفرص عبر جميع الولايات الـ69، محلياً أو عن بعد." },
  // Client benefits
  "whyUs.cli.topTalent": { en: "Access Top Talent", fr: "Accédez aux meilleurs talents", ar: "اوصل لأفضل المواهب" },
  "whyUs.cli.topTalentDesc": { en: "Browse 1,500+ verified professionals across all industries in Algeria.", fr: "Parcourez plus de 1 500 professionnels vérifiés dans tous les secteurs en Algérie.", ar: "تصفح أكثر من 1500 محترف موثق عبر جميع الصناعات في الجزائر." },
  "whyUs.cli.hireFast": { en: "Hire in 24 Hours", fr: "Recrutez en 24 heures", ar: "وظف في 24 ساعة" },
  "whyUs.cli.hireFastDesc": { en: "Our smart matching engine surfaces the best candidates for your job in minutes.", fr: "Notre moteur de matching intelligent trouve les meilleurs candidats pour votre poste en minutes.", ar: "محرك المطابقة الذكي يظهر أفضل المرشحين لوظيفتك في دقائق." },
  "whyUs.cli.securePayments": { en: "Secure Payments", fr: "Paiements sécurisés", ar: "مدفوعات آمنة" },
  "whyUs.cli.securePaymentsDesc": { en: "Escrow-protected payments. Funds released only on project completion.", fr: "Paiements protégés par séquestre. Fonds libérés uniquement à la fin du projet.", ar: "مدفوعات محمية بالضمان. يتم تحرير الأموال فقط عند اكتمال المشروع." },
  "whyUs.cli.quality": { en: "Quality Guaranteed", fr: "Qualité garantie", ar: "جودة مضمونة" },
  "whyUs.cli.qualityDesc": { en: "All professionals are vetted. Read real reviews before you commit.", fr: "Tous les professionnels sont vérifiés. Lisez de vrais avis avant de vous engager.", ar: "جميع المحترفين مدققون. اقرأ تقييمات حقيقية قبل الالتزام." },
  // Enterprise benefits
  "whyUs.ent.scale": { en: "Scale Hiring at Speed", fr: "Recrutement à grande échelle", ar: "وسّع التوظيف بسرعة" },
  "whyUs.ent.scaleDesc": { en: "Post unlimited jobs, manage multiple applicants, and build your workforce.", fr: "Publiez des offres illimitées, gérez plusieurs candidats et construisez votre effectif.", ar: "انشر وظائف غير محدودة، أدر عدة متقدمين، وابنِ قوتك العاملة." },
  "whyUs.ent.verification": { en: "Enterprise Verification", fr: "Vérification entreprise", ar: "توثيق المؤسسة" },
  "whyUs.ent.verificationDesc": { en: "Get your enterprise badge to attract the best talent in the market.", fr: "Obtenez votre badge entreprise pour attirer les meilleurs talents du marché.", ar: "احصل على شارة المؤسسة لجذب أفضل المواهب في السوق." },
  "whyUs.ent.analytics": { en: "Analytics Dashboard", fr: "Tableau de bord analytique", ar: "لوحة تحليلات" },
  "whyUs.ent.analyticsDesc": { en: "Track applications, conversions, and hiring metrics in real time.", fr: "Suivez les candidatures, conversions et métriques de recrutement en temps réel.", ar: "تتبع الطلبات والتحويلات ومقاييس التوظيف في الوقت الفعلي." },
  "whyUs.ent.contracts": { en: "Contract Management", fr: "Gestion des contrats", ar: "إدارة العقود" },
  "whyUs.ent.contractsDesc": { en: "Digital contracts, NDAs, and compliance tools built for Algerian businesses.", fr: "Contrats numériques, NDA et outils de conformité conçus pour les entreprises algériennes.", ar: "عقود رقمية واتفاقيات سرية وأدوات امتثال مصممة للشركات الجزائرية." },
  // Trust & Security
  "whyUs.trustBadge": { en: "Trust & Security First", fr: "Confiance et sécurité d'abord", ar: "الثقة والأمان أولاً" },
  "whyUs.builtOnTrust": { en: "Built on", fr: "Construit sur la", ar: "مبني على" },
  "whyUs.trust": { en: "Trust", fr: "Confiance", ar: "الثقة" },
  "whyUs.trustDesc": { en: "Every layer of Hustlify is designed to protect both talent and clients, creating a safe and reliable marketplace.", fr: "Chaque couche de Hustlify est conçue pour protéger les talents et les clients, créant un marché sûr et fiable.", ar: "كل طبقة من هسلفاي مصممة لحماية المواهب والعملاء، مما يخلق سوقاً آمناً وموثوقاً." },
  "whyUs.idVerification": { en: "ID Verification", fr: "Vérification d'identité", ar: "التحقق من الهوية" },
  "whyUs.idVerificationDesc": { en: "Every professional is ID-verified before going live on the platform.", fr: "Chaque professionnel est vérifié avant d'être actif sur la plateforme.", ar: "يتم التحقق من هوية كل محترف قبل الظهور على المنصة." },
  "whyUs.skillAssessment": { en: "Skill Assessment", fr: "Évaluation des compétences", ar: "تقييم المهارات" },
  "whyUs.skillAssessmentDesc": { en: "Domain-specific tests ensure candidates have the skills they claim.", fr: "Des tests spécifiques garantissent que les candidats possèdent les compétences qu'ils revendiquent.", ar: "اختبارات متخصصة تضمن امتلاك المرشحين للمهارات المطلوبة." },
  "whyUs.escrowPayments": { en: "Escrow Payments", fr: "Paiements séquestrés", ar: "مدفوعات مضمونة" },
  "whyUs.escrowPaymentsDesc": { en: "Client funds are held securely and released only after delivery confirmation.", fr: "Les fonds des clients sont détenus en sécurité et libérés uniquement après confirmation.", ar: "يتم الاحتفاظ بأموال العملاء بأمان وتحريرها فقط بعد تأكيد التسليم." },
  "whyUs.transparentReviews": { en: "Transparent Reviews", fr: "Avis transparents", ar: "تقييمات شفافة" },
  "whyUs.transparentReviewsDesc": { en: "All reviews are verified and tied to real completed projects.", fr: "Tous les avis sont vérifiés et liés à de vrais projets terminés.", ar: "جميع التقييمات موثقة ومرتبطة بمشاريع حقيقية مكتملة." },
  "whyUs.algerianFocused": { en: "Algerian-Focused", fr: "Focalisé sur l'Algérie", ar: "مركّز على الجزائر" },
  "whyUs.algerianFocusedDesc": { en: "Built for Algeria with local payment methods and wilaya-level search.", fr: "Conçu pour l'Algérie avec des méthodes de paiement locales et recherche par wilaya.", ar: "مصمم للجزائر مع طرق دفع محلية وبحث على مستوى الولاية." },
  "whyUs.communityTrustScore": { en: "Community Trust Score", fr: "Score de confiance communautaire", ar: "نقاط ثقة المجتمع" },
  "whyUs.communityTrustScoreDesc": { en: "Dynamic trust scores based on history, ratings, and platform activity.", fr: "Scores de confiance dynamiques basés sur l'historique, les notes et l'activité.", ar: "نقاط ثقة ديناميكية بناءً على السجل والتقييمات والنشاط." },
  // Comparison
  "whyUs.vsOthers": { en: "Others", fr: "Autres", ar: "الآخرون" },
  "whyUs.comparison": { en: "See what makes us different from generic platforms", fr: "Découvrez ce qui nous différencie des plateformes génériques", ar: "اكتشف ما يميزنا عن المنصات العامة" },
  "whyUs.feature": { en: "Feature", fr: "Fonctionnalité", ar: "الميزة" },
  "whyUs.comp1": { en: "Algerian-focused platform", fr: "Plateforme centrée sur l'Algérie", ar: "منصة مركزة على الجزائر" },
  "whyUs.comp2": { en: "ID-verified professionals", fr: "Professionnels vérifiés par ID", ar: "محترفون موثقون بالهوية" },
  "whyUs.comp3": { en: "Wilaya-level search (69)", fr: "Recherche par wilaya (69)", ar: "بحث على مستوى الولاية (69)" },
  "whyUs.comp4": { en: "Escrow-protected payments", fr: "Paiements protégés par séquestre", ar: "مدفوعات محمية بالضمان" },
  "whyUs.comp5": { en: "Real-time analytics dashboard", fr: "Tableau de bord analytique en temps réel", ar: "لوحة تحليلات في الوقت الفعلي" },
  "whyUs.comp6": { en: "Free to join", fr: "Inscription gratuite", ar: "التسجيل مجاني" },
  "whyUs.comp7": { en: "Skill assessments", fr: "Évaluations des compétences", ar: "تقييمات المهارات" },
  "whyUs.comp8": { en: "Enterprise-grade tools", fr: "Outils de niveau entreprise", ar: "أدوات بمستوى المؤسسات" },
  // Testimonials
  "whyUs.communityTitle": { en: "What Our", fr: "Ce que notre", ar: "ماذا يقول" },
  "whyUs.community": { en: "Community", fr: "Communauté", ar: "مجتمعنا" },
  "whyUs.communitySays": { en: "Says", fr: "Dit", ar: "" },
  "whyUs.communityDesc": { en: "Real stories from real users across Algeria", fr: "Histoires réelles d'utilisateurs à travers l'Algérie", ar: "قصص حقيقية من مستخدمين حقيقيين عبر الجزائر" },
  "whyUs.tagEmployee": { en: "Employee", fr: "Employé", ar: "موظف" },
  "whyUs.tagClient": { en: "Client", fr: "Client", ar: "عميل" },
  "whyUs.tagEnterprise": { en: "Enterprise", fr: "Entreprise", ar: "مؤسسة" },
  "whyUs.testimonial1": { en: "Hustlify changed how I find work. I now have steady projects from verified clients and my income has doubled in just 6 months.", fr: "Hustlify a changé ma façon de trouver du travail. J'ai maintenant des projets réguliers de clients vérifiés et mes revenus ont doublé en 6 mois.", ar: "هسلفاي غيرت طريقة بحثي عن العمل. لدي الآن مشاريع مستمرة من عملاء موثقين وتضاعف دخلي في 6 أشهر." },
  "whyUs.testimonial2": { en: "We hired our entire tech team through Hustlify. The quality of talent and the speed of hiring is unmatched in Algeria.", fr: "Nous avons recruté toute notre équipe tech via Hustlify. La qualité des talents et la rapidité du recrutement sont inégalées en Algérie.", ar: "وظفنا فريقنا التقني بالكامل عبر هسلفاي. جودة المواهب وسرعة التوظيف لا مثيل لهما في الجزائر." },
  "whyUs.testimonial3": { en: "As an enterprise, the analytics and reporting tools give us the visibility we need to make confident hiring decisions at scale.", fr: "En tant qu'entreprise, les outils d'analyse nous donnent la visibilité nécessaire pour prendre des décisions de recrutement à grande échelle.", ar: "كمؤسسة، أدوات التحليل والتقارير تمنحنا الرؤية اللازمة لاتخاذ قرارات توظيف واثقة على نطاق واسع." },
  // CTA
  "whyUs.ctaBadge": { en: "No credit card required", fr: "Aucune carte de crédit requise", ar: "لا حاجة لبطاقة ائتمان" },
  "whyUs.ctaTitle": { en: "Ready to Join Algeria's Top Talent Network?", fr: "Prêt à rejoindre le meilleur réseau de talents d'Algérie ?", ar: "مستعد للانضمام إلى أفضل شبكة مواهب في الجزائر؟" },
  "whyUs.ctaDesc": { en: "Start free. Set up your profile in 5 minutes and start connecting today.", fr: "Commencez gratuitement. Créez votre profil en 5 minutes et connectez-vous aujourd'hui.", ar: "ابدأ مجاناً. أنشئ ملفك في 5 دقائق وابدأ التواصل اليوم." },
  "whyUs.findWork": { en: "Find Work", fr: "Trouver du travail", ar: "ابحث عن عمل" },
  "whyUs.hireTalent": { en: "Hire Talent", fr: "Recruter des talents", ar: "وظف مواهب" },

  // ── Sponsors Page ──
  "sponsors.badge": { en: "Our Partners & Sponsors", fr: "Nos Partenaires & Sponsors", ar: "شركاؤنا ورعاتنا" },
  "sponsors.heroTitle1": { en: "Trusted by", fr: "Approuvé par les", ar: "موثوق من قبل" },
  "sponsors.heroTitle2": { en: "Algeria's Leaders", fr: "Leaders d'Algérie", ar: "قادة الجزائر" },
  "sponsors.heroDesc": { en: "500+ enterprises across Algeria trust Hustlify for talent discovery and workforce management. Join the movement shaping Algeria's professional future.", fr: "Plus de 500 entreprises à travers l'Algérie font confiance à Hustlify pour la découverte de talents. Rejoignez le mouvement qui façonne l'avenir professionnel de l'Algérie.", ar: "أكثر من 500 مؤسسة عبر الجزائر تثق بهسلفاي لاكتشاف المواهب وإدارة القوى العاملة. انضم للحركة التي تشكل مستقبل الجزائر المهني." },
  "sponsors.becomePartner": { en: "Become a Partner", fr: "Devenir Partenaire", ar: "كن شريكاً" },
  "sponsors.platinum": { en: "Platinum Partners", fr: "Partenaires Platine", ar: "شركاء بلاتينيون" },
  "sponsors.gold": { en: "Gold Partners", fr: "Partenaires Or", ar: "شركاء ذهبيون" },
  "sponsors.silver": { en: "Silver Partners", fr: "Partenaires Argent", ar: "شركاء فضيون" },
  "sponsors.bronze": { en: "Bronze Partners", fr: "Partenaires Bronze", ar: "شركاء برونزيون" },
  "sponsors.employees": { en: "employees", fr: "employés", ar: "موظف" },
  "sponsors.whyPartner": { en: "Why Partner with Hustlify?", fr: "Pourquoi devenir partenaire de Hustlify ?", ar: "لماذا تكون شريكاً مع هسلفاي؟" },
  "sponsors.whyPartnerDesc": { en: "Give your brand national presence and talent access", fr: "Donnez à votre marque une présence nationale et accès aux talents", ar: "امنح علامتك التجارية حضوراً وطنياً ووصولاً للمواهب" },
  "sponsors.sponsorshipTiers": { en: "Sponsorship Tiers", fr: "Niveaux de parrainage", ar: "مستويات الرعاية" },
  "sponsors.sponsorshipTiersDesc": { en: "Choose the partnership level that best fits your organization", fr: "Choisissez le niveau de partenariat qui correspond le mieux à votre organisation", ar: "اختر مستوى الشراكة الذي يناسب مؤسستك" },
  "sponsors.mostPopular": { en: "Most Popular", fr: "Plus Populaire", ar: "الأكثر شعبية" },
  "sponsors.getStarted": { en: "Get Started", fr: "Commencer", ar: "ابدأ" },
  "sponsors.ctaTitle": { en: "Ready to Partner with Hustlify?", fr: "Prêt à devenir partenaire de Hustlify ?", ar: "مستعد للشراكة مع هسلفاي؟" },
  "sponsors.ctaDesc": { en: "Let's discuss the right sponsorship plan for your organization.", fr: "Discutons du plan de parrainage adapté à votre organisation.", ar: "لنناقش خطة الرعاية المناسبة لمؤسستك." },
  "sponsors.contactTeam": { en: "Contact Partnerships Team", fr: "Contacter l'équipe Partenariats", ar: "اتصل بفريق الشراكات" },

  // ── Contact Page ──
  "contact.badge": { en: "We're Here to Help", fr: "Nous sommes là pour vous aider", ar: "نحن هنا لمساعدتك" },
  "contact.heroTitle1": { en: "Get in", fr: "Prenez", ar: "تواصل" },
  "contact.heroTitle2": { en: "Touch", fr: "Contact", ar: "معنا" },
  "contact.heroDesc": { en: "Have a question, partnership inquiry, or need support? Our team in Algeria is ready to help you.", fr: "Vous avez une question, une demande de partenariat ou besoin d'aide ? Notre équipe en Algérie est prête à vous aider.", ar: "هل لديك سؤال أو استفسار عن شراكة أو تحتاج دعم؟ فريقنا في الجزائر مستعد لمساعدتك." },
  "contact.email": { en: "Email", fr: "E-mail", ar: "البريد الإلكتروني" },
  "contact.phone": { en: "Phone", fr: "Téléphone", ar: "الهاتف" },
  "contact.office": { en: "Office", fr: "Bureau", ar: "المكتب" },
  "contact.emailDesc": { en: "For general & support inquiries", fr: "Pour les demandes générales et support", ar: "للاستفسارات العامة والدعم" },
  "contact.phoneDesc": { en: "Sun–Thu, 9am–5pm (Alger)", fr: "Dim–Jeu, 9h–17h (Alger)", ar: "الأحد–الخميس، 9ص–5م (الجزائر)" },
  "contact.officeDesc": { en: "Innovation Valley, Bab Ezzouar", fr: "Innovation Valley, Bab Ezzouar", ar: "وادي الابتكار، باب الزوار" },
  "contact.officeLocation": { en: "Alger, Algeria", fr: "Alger, Algérie", ar: "الجزائر العاصمة، الجزائر" },
  "contact.helpWith": { en: "What can we help with?", fr: "Comment pouvons-nous vous aider ?", ar: "كيف يمكننا مساعدتك؟" },
  "contact.forClients": { en: "For Clients", fr: "Pour les Clients", ar: "للعملاء" },
  "contact.forClientsDesc": { en: "Help with hiring, payments, and managing projects.", fr: "Aide au recrutement, paiements et gestion de projets.", ar: "مساعدة في التوظيف والمدفوعات وإدارة المشاريع." },
  "contact.forEmployees": { en: "For Employees", fr: "Pour les Employés", ar: "للموظفين" },
  "contact.forEmployeesDesc": { en: "Profile setup, job applications, and account support.", fr: "Configuration de profil, candidatures et support compte.", ar: "إعداد الملف، طلبات التوظيف ودعم الحساب." },
  "contact.forEnterprises": { en: "For Enterprises", fr: "Pour les Entreprises", ar: "للمؤسسات" },
  "contact.forEnterprisesDesc": { en: "Onboarding, plan management, and partnerships.", fr: "Intégration, gestion de plan et partenariats.", ar: "التسجيل وإدارة الخطط والشراكات." },
  "contact.techSupport": { en: "Technical Support", fr: "Support technique", ar: "الدعم التقني" },
  "contact.techSupportDesc": { en: "Platform bugs, account access, and technical issues.", fr: "Bugs de plateforme, accès au compte et problèmes techniques.", ar: "أخطاء المنصة والوصول للحساب والمشاكل التقنية." },
  "contact.sendMessage": { en: "Send Us a Message", fr: "Envoyez-nous un message", ar: "أرسل لنا رسالة" },
  "contact.fullName": { en: "Full Name", fr: "Nom complet", ar: "الاسم الكامل" },
  "contact.yourName": { en: "Your name", fr: "Votre nom", ar: "اسمك" },
  "contact.yourEmail": { en: "your@email.com", fr: "votre@email.com", ar: "بريدك@الإلكتروني.com" },
  "contact.subject": { en: "Subject", fr: "Sujet", ar: "الموضوع" },
  "contact.subjectPlaceholder": { en: "How can we help you?", fr: "Comment pouvons-nous vous aider ?", ar: "كيف يمكننا مساعدتك؟" },
  "contact.inquiryType": { en: "Inquiry Type", fr: "Type de demande", ar: "نوع الاستفسار" },
  "contact.selectType": { en: "Select inquiry type", fr: "Sélectionner le type de demande", ar: "اختر نوع الاستفسار" },
  "contact.message": { en: "Message", fr: "Message", ar: "الرسالة" },
  "contact.messagePlaceholder": { en: "Tell us more about your inquiry...", fr: "Dites-nous en plus sur votre demande...", ar: "أخبرنا المزيد عن استفسارك..." },
  "contact.send": { en: "Send Message", fr: "Envoyer", ar: "إرسال" },
  "contact.disclaimer": { en: "We respond within 24–48 hours. Your information is kept private.", fr: "Nous répondons sous 24–48 heures. Vos informations restent privées.", ar: "نرد خلال 24-48 ساعة. معلوماتك تبقى خاصة." },
  "contact.messageSent": { en: "Message Sent!", fr: "Message envoyé !", ar: "تم إرسال الرسالة!" },
  "contact.thankYou": { en: "Thank you for reaching out. Our team will get back to you within 24–48 hours.", fr: "Merci de nous avoir contactés. Notre équipe vous répondra sous 24–48 heures.", ar: "شكراً لتواصلك. فريقنا سيرد عليك خلال 24-48 ساعة." },
  "contact.responseTime": { en: "Typical response time:", fr: "Temps de réponse typique :", ar: "وقت الرد المعتاد:" },
  "contact.under24": { en: "under 24 hours", fr: "moins de 24 heures", ar: "أقل من 24 ساعة" },
  "contact.sendAnother": { en: "Send Another Message", fr: "Envoyer un autre message", ar: "إرسال رسالة أخرى" },
  "contact.followUs": { en: "Follow us on social media", fr: "Suivez-nous sur les réseaux sociaux", ar: "تابعنا على وسائل التواصل" },
  "contact.faq": { en: "Frequently Asked Questions", fr: "Questions fréquemment posées", ar: "الأسئلة الشائعة" },
  "contact.liveSupport": { en: "Live Support", fr: "Support en direct", ar: "دعم مباشر" },
  "contact.liveSupportDesc": { en: "Need immediate help? Chat with our support team during business hours.", fr: "Besoin d'aide immédiate ? Discutez avec notre équipe pendant les heures de bureau.", ar: "تحتاج مساعدة فورية؟ تحدث مع فريق الدعم خلال ساعات العمل." },
  "contact.startChat": { en: "Start Live Chat", fr: "Démarrer le chat", ar: "بدء المحادثة" },
  "contact.partnership": { en: "Partnership / Sponsorship", fr: "Partenariat / Parrainage", ar: "شراكة / رعاية" },
  "contact.pressMedia": { en: "Press & Media", fr: "Presse & Médias", ar: "الصحافة والإعلام" },
  "contact.other": { en: "Other", fr: "Autre", ar: "أخرى" },
  // FAQ entries
  "contact.faq1q": { en: "How do I get started on Hustlify?", fr: "Comment commencer sur Hustlify ?", ar: "كيف أبدأ على هسلفاي؟" },
  "contact.faq1a": { en: "Getting started is easy! Click 'Get Started' on the homepage, enter your email, and choose whether you're an Employee, Client, or Enterprise. You'll be set up in under 5 minutes.", fr: "C'est facile ! Cliquez sur 'Commencer' sur la page d'accueil, entrez votre email et choisissez si vous êtes Employé, Client ou Entreprise. Vous serez opérationnel en moins de 5 minutes.", ar: "البدء سهل! انقر على 'ابدأ' في الصفحة الرئيسية، أدخل بريدك الإلكتروني واختر ما إذا كنت موظفاً أو عميلاً أو مؤسسة. ستكون جاهزاً في أقل من 5 دقائق." },
  "contact.faq2q": { en: "Is Hustlify free to use?", fr: "Hustlify est-il gratuit ?", ar: "هل هسلفاي مجاني؟" },
  "contact.faq2a": { en: "Hustlify is free for employees and freelancers. Clients and enterprises have a free tier with limited job posts, and premium plans starting from 14,900 DZD/month for unlimited access.", fr: "Hustlify est gratuit pour les employés et freelances. Les clients et entreprises ont un plan gratuit limité, et des plans premium à partir de 14 900 DZD/mois pour un accès illimité.", ar: "هسلفاي مجاني للموظفين والمستقلين. للعملاء والمؤسسات خطة مجانية محدودة، وخطط متميزة تبدأ من 14,900 دج/شهر للوصول غير المحدود." },
  "contact.faq3q": { en: "How does payment work?", fr: "Comment fonctionnent les paiements ?", ar: "كيف تعمل المدفوعات؟" },
  "contact.faq3a": { en: "Payments are made through our secure escrow system. Client funds are held safely and released to the professional only after project completion confirmation. We support CCP, Baridimob, and bank transfers.", fr: "Les paiements se font via notre système de séquestre sécurisé. Les fonds sont détenus en sécurité et libérés uniquement après confirmation. Nous supportons CCP, Baridimob et virements bancaires.", ar: "تتم المدفوعات عبر نظام الضمان الآمن. يتم الاحتفاظ بأموال العميل بأمان وتحريرها للمحترف فقط بعد تأكيد اكتمال المشروع. ندعم CCP وباريديموب والتحويلات البنكية." },
  "contact.faq4q": { en: "How are professionals verified?", fr: "Comment les professionnels sont-ils vérifiés ?", ar: "كيف يتم التحقق من المحترفين؟" },
  "contact.faq4a": { en: "Every professional goes through our ID verification process and domain-specific skill assessment. Verified profiles get a trust badge visible to all clients.", fr: "Chaque professionnel passe par notre processus de vérification d'identité et évaluation de compétences. Les profils vérifiés obtiennent un badge de confiance visible par tous.", ar: "يخضع كل محترف لعملية التحقق من الهوية وتقييم المهارات المتخصصة. تحصل الملفات الموثقة على شارة ثقة مرئية لجميع العملاء." },
  "contact.faq5q": { en: "Can enterprises post jobs for free?", fr: "Les entreprises peuvent-elles publier des offres gratuitement ?", ar: "هل يمكن للمؤسسات نشر وظائف مجاناً؟" },
  "contact.faq5a": { en: "Enterprises get 5 free job posts per month on the Starter plan. For unlimited posts and advanced features like AI matching and analytics, upgrade to Enterprise Pro.", fr: "Les entreprises obtiennent 5 offres gratuites par mois avec le plan Starter. Pour des offres illimitées et des fonctionnalités avancées, passez à Enterprise Pro.", ar: "تحصل المؤسسات على 5 منشورات وظيفية مجانية شهرياً في خطة البداية. للمنشورات غير المحدودة والميزات المتقدمة، قم بالترقية إلى Enterprise Pro." },
  "contact.faq6q": { en: "How do I report a problem or dispute?", fr: "Comment signaler un problème ou un litige ?", ar: "كيف أبلغ عن مشكلة أو نزاع؟" },
  "contact.faq6a": { en: "You can contact our support team via this contact form, email us at support@hustlify.dz, or open a dispute directly from your dashboard. We aim to resolve all issues within 24–48 hours.", fr: "Vous pouvez contacter notre équipe via ce formulaire, nous envoyer un email à support@hustlify.dz, ou ouvrir un litige depuis votre tableau de bord. Nous visons à résoudre tous les problèmes sous 24–48 heures.", ar: "يمكنك الاتصال بفريق الدعم عبر هذا النموذج أو مراسلتنا على support@hustlify.dz أو فتح نزاع مباشرة من لوحة التحكم. نهدف لحل جميع المشاكل خلال 24-48 ساعة." },

  // ── Auth Page ──
  "auth.getStarted": { en: "Get Started", fr: "Commencer", ar: "ابدأ" },
  "auth.enterEmail": { en: "Enter your email to begin", fr: "Entrez votre email pour commencer", ar: "أدخل بريدك الإلكتروني للبدء" },
  "auth.continue": { en: "Continue", fr: "Continuer", ar: "متابعة" },
  "auth.haveAccount": { en: "Already have an account?", fr: "Vous avez déjà un compte ?", ar: "لديك حساب بالفعل؟" },
  "auth.loginHere": { en: "Log in here", fr: "Se connecter ici", ar: "سجل الدخول هنا" },
  "auth.welcomeBack": { en: "Welcome Back", fr: "Bon retour", ar: "أهلاً بعودتك" },
  "auth.loginDesc": { en: "Sign in to your account", fr: "Connectez-vous à votre compte", ar: "سجل الدخول إلى حسابك" },
  "auth.password": { en: "Password", fr: "Mot de passe", ar: "كلمة المرور" },
  "auth.logIn": { en: "Log In", fr: "Se connecter", ar: "تسجيل الدخول" },
  "auth.noAccount": { en: "Don't have an account?", fr: "Pas de compte ?", ar: "ليس لديك حساب؟" },
  "auth.signUpHere": { en: "Sign up here", fr: "S'inscrire ici", ar: "سجل هنا" },
  "auth.chooseRole": { en: "Choose Your Role", fr: "Choisissez votre rôle", ar: "اختر دورك" },
  "auth.backToHome": { en: "Back to Home", fr: "Retour à l'accueil", ar: "العودة للرئيسية" },
};

// ─── Provider ────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem("hustlify-lang");
      if (stored === "en" || stored === "fr" || stored === "ar") return stored;
    } catch {}
    return "en";
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("hustlify-lang", newLang);
    } catch {}
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    if (lang === "ar") {
      document.documentElement.style.fontFamily = "'Noto Sans Arabic', 'Inter', sans-serif";
    } else {
      document.documentElement.style.fontFamily = "'Inter', sans-serif";
    }
  }, [lang, dir]);

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}