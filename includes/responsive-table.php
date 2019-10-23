		<div class="responsive-table">
			<?php if( have_rows('table_headers') ): ?>
			<table>

				<?php while( have_rows('table_headers') ): the_row();
                    $col1 = get_sub_field('column_1');
                    $col2 = get_sub_field('column_2');
                    $col3 = get_sub_field('column_3');
                    $col4 = get_sub_field('column_4');
                    $col5 = get_sub_field('column_5');
                    $col6 = get_sub_field('column_6');
				?>							
				<thead>
					<tr>
						<th scope="col"><?php echo $col1 ; ?></th>
						<th scope="col"><?php echo $col2 ; ?></th>
						<th scope="col"><?php echo $col3 ; ?></th>
						<th scope="col"><?php echo $col4 ; ?></th>
						<th scope="col"><?php echo $col5 ; ?></th>
						<th scope="col"><?php echo $col6 ; ?></th>
					</tr>
				</thead>

				<tbody>

					<?php if( have_rows('table_rows') ): ?>
					<?php while( have_rows('table_rows') ): the_row(); ?>
					<tr>
						<td scope="row" data-label="<?php echo $col1 ; ?>"><?php the_sub_field('col1_cell-content'); ?></td>
						<td data-label="<?php echo $col2 ; ?>"><?php the_sub_field('col2_cell-content'); ?></td>
						<td data-label="<?php echo $col3 ; ?>"><?php the_sub_field('col3_cell-content'); ?></td>
						<td data-label="<?php echo $col4 ; ?>"><?php the_sub_field('col4_cell-content'); ?></td>
						<td data-label="<?php echo $col5 ; ?>"><?php the_sub_field('col5_cell-content'); ?></td>
						<td data-label="<?php echo $col6 ; ?>"><?php the_sub_field('col6_cell-content'); ?></td>						
					</tr>
					<?php endwhile; ?>	
					<?php endif; ?>  <!-- end ACF Table Rows -->


					<?php if( have_rows('table_footnotes') ): ?>							
					<tr>
						<td class="footnotes" colspan="100%">
							<ul>
								<?php while( have_rows('table_footnotes') ): the_row(); ?>	

								<?php if( have_rows('note') ): ?>	
								<?php while( have_rows('note') ): the_row(); ?>	
								<li><span class="asterisk"><?php the_sub_field('note_asterisk'); ?></span> <?php the_sub_field('note_content'); ?></li>
								<?php endwhile; ?>	
								<?php endif; ?>												

								<?php endwhile; ?>	
							</ul>
						</td>
					</tr>
					<?php endif; ?>  <!-- end ACF Footnotes -->

				</tbody>				  								
				<?php endwhile; ?>	

			</table>
			<?php endif; ?>  <!-- end ACF Table Headers -->		

		</div>