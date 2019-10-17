<?php get_header(); ?>

	<section id="header--page" class="container--slim"> 				
		<div id="header--page__content">
			<?php if ( function_exists('yoast_breadcrumb') ) 
				{yoast_breadcrumb('<p id="breadcrumbs">','</p>');} ?>
		</div>
		<h1 class="main--article__title">Search</h1>															
	</section>  <!--- end of #header--page --->


	<main class="container--slim">
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<article id="post-<?php the_ID(); ?>" role="article">
				<header class="entry-header article-header">
					<h3 class="search-title entry-title">
						<a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
					</h3>
				</header>

				<section class="entry-content">
					<?php the_excerpt( '<span class="read-more">' . __( 'Read more &raquo;', 'p1wscore' ) . '</span>' ); ?>
				</section>

				<footer class="article-footer"></footer> <!-- end article footer -->

			</article>

			<?php endwhile; ?>
			<?php p1ws_page_navi(); ?>
			<?php else : ?>

			<article id="post-not-found" class="hentry">
				<header class="article-header">
					<h1><?php _e( 'Sorry, No Results.', 'p1wscore' ); ?></h1>
				</header>
				<section class="entry-content">
					<p><?php _e( 'Try your search again.', 'p1wscore' ); ?></p>
				</section>
				<footer class="article-footer">
					<p></p>
				</footer>
			</article>

		<?php endif; ?>
	</main>


<?php get_footer(); ?>
