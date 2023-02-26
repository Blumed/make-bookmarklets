<script>
	export let title = "";
	export let pageCanonicalUrl = "";
	export let pageMetaDescription = "";

	export const baseUrl = "https://make-bookmarklets.com";
	export const ogImage =
		"https://make-bookmarklets.com/default-og-image.webp";
	export const twitterImage =
		"https://make-bookmarklets.com/default-twitter-image.webp";

	export let seo = {
		title: "Make Bookmarklets · Not War",
		description:
			"Create and test bookmarklets in your browser. Extend your browsing experience any way you see fit.",
		canonical: baseUrl,
	};

	$: pageTitle = title !== "" ? `Make Bookmarklets · ${title}` : seo.title;
	$: canonicalUrl = `${baseUrl}${pageCanonicalUrl}` ?? seo.canonical;
	$: metaDescription =
		pageMetaDescription !== "" ? pageMetaDescription : seo.description;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metaDescription} />
	<!-- Open Graph -->
	<meta content="Make Bookmarklets" property="og:site_name" />
	<meta content="Make Bookmarklets · Not War" property="og:title" />
	<meta content="website" property="og:type" />
	<meta content={seo.description} property="og:description" />
	<meta content={baseUrl} property="og:url" />
	<meta content={ogImage} property="og:image" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@CullanLuther" />
	<meta content="Make Bookmarklets · Not War" property="twitter:title" />
	<meta content={seo.description} property="twitter:description" />
	<meta name="twitter:creator" content="@CullanLuther" />
	<meta content={twitterImage} property="twitter:image" />
	<meta name="color-scheme" content="dark light" />
	<link rel="canonical" href={canonicalUrl} />
</svelte:head>
