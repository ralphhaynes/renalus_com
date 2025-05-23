import { Suspense } from 'react'

import { Container, Section } from '@/components/Compose'
import { Lead, Title } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { Backdrop, Button } from '@/components/UI'
import { gap, spaceY } from '@/lib/tw'
import { cn } from '@/lib/utils'
import { Contact } from '@/team/Contact'
import { Controls } from '@/team/Controls'

const Hero = ({
	name,
	img,
	locations,
	position,
	priority,
	children,
}) => {
	return (
		<>
			<Section className='__hero' data-theme='dark'>
				<Container
					as='div'
					gap='none'
					className='md:grid-cols-12 max-lg:gap-x-4 max-lg:gap-y-10 overflow-clip'
				>
					{/* 4 Cols Image */}
					<Avatar img={img} />

					{/* 7 Cols */}
					<article className='md:col-span-8 lg:col-span-7 md:px-4 xl:px-8'>
						<div className='__xs flex flex-col gap-2 lg:pt-fluid lg:h-[280px]'>
							{/* Name / Department */}
							<div className={spaceY.md}>
								{/* Label */}
								<Title
									as='h6'
									title='Meet the Doctor'
									className='__label text-yellow'
								/>

								{/* Name */}
								<Lead
									title={name}
									subtitle={position}
									layout='stack'
									gap={0}
									className={{
										title: 'text-stone-50',
										subtitle: '__label text-stone-50',
									}}
									as={{ title: 'h1', subtitle: 'h6' }}
								/>
							</div>

							{/* Titles */}
							<Contact locations={locations} />
						</div>

						{children}
					</article>

					{/* 1 Col */}
					<Suspense>
						<Controls priority={priority} />
					</Suspense>
				</Container>

				{/* Backdrop -- Large screen */}
				<Backdrop
					layer
					color='indigo'
					className='h-[545px] rounded-t-4xl overflow-hidden'
				/>
			</Section>
		</>
	)
}

const Avatar = ({ img }) => (
	<div className='relative md:col-span-4 max-md:pt-6'>
		<div
			className={cn(
				'relative z-2 md:sticky md:top-20',
				'md:pt-0 md:pb-16',
				'max-w-2xs md:max-w-96',
				'flex flex-col items-center',
				gap.md,
			)}
		>
			<AspectImage
				priority
				img={img}
				className={{
					figure: 'md:aspect-w-3 md:aspect-h-4',
					img: 'rounded-full md:rounded-xl',
				}}
			/>

			<Button
				link={{ href: '/about#our-doctors', text: 'Back to Team' }}
				variant='flat'
				size='sm'
				className='__label'
				arrow={{
					direction: 'left',
					size: 'lg',
					variant: 'long',
					className: '-order-1',
				}}
			/>
		</div>
	</div>
)

export { Hero }
