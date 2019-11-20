
<template>
  <article>
    <h1>{{ title }}</h1>
    <section id="content" v-html="content" />
  </article>
</template>


<script>
export default {
	async asyncData({ params }) {
	  	try
	  	{
			const { slug } = params;
			const post = await import(`~/content/${slug}.md`);
			const { attributes, html } = post;
			return {
				...attributes,
				content: html,
			};
		}
		catch (error)
		{
 			return false;
   		}
	},
	head() {

		// console.log(this);
		// return { title: this.post.attributes.title || 'farts' };
	}
};
</script>
