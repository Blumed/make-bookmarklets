<script>
	export let title = "";
	export let pageCanonicalUrl = "";
	export let pageMetaDescription = "";

	export const baseUrl = "https://make-bookmarklets.com";
	export const ogImage = "/default-og-image.webp";
	export const twitterImage = "/default-twitter-image.webp";

	export let seo = {
		title: "Make Bookmarklets | Make it easy",
		description:
			"A bookmarklet generator which is clean and easy to use. Create and test bookmarklets in your browser. Extend your browsing experience any way you see fit.",
		canonical: baseUrl,
	};

	$: pageTitle = title !== "" ? title : seo.title;
	$: canonicalUrl = `${baseUrl}${pageCanonicalUrl}` ?? seo.canonical;
	$: metaDescription =
		pageMetaDescription !== "" ? pageMetaDescription : seo.description;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="preload" as="image" href="/flat-bookmark.svg" />
	<meta name="description" content={metaDescription} />
	<!-- Open Graph -->
	<meta property="og:site_name" content="Make Bookmarklets" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={baseUrl + ogImage} />
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:site" content="@CullanLuther" />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={metaDescription} />
	<meta property="twitter:creator" content="@CullanLuther" />
	<meta property="twitter:image" content={baseUrl + ogImage} />
	<meta name="color-scheme" content="dark light" />
	<link rel="canonical" href={canonicalUrl} />
</svelte:head>
