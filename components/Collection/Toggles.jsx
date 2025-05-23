import { Section } from '@/components/Compose'
import { Body, ContentSplitProse } from '@/components/Content'
import { ButtonLink, Divider, Flex, Toggle } from '@/components/UI'
import {
	hashify,
	invalidArrObjectData,
	invalidObjectData,
	normalizeByField,
	padZero,
	slugify,
} from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const CollectionToggles = ({ items, ...contentProps }) => {
	const groups = normalizeByField(items, 'group')

	return (
		<>
			<ContentSplitProse
				{...contentProps}
				className={{ container: '__xs' }}
			/>
			<Section container layout='grid' cols={12} width='sm'>
				<TogglesNav
					groups={groups}
					className='col-span-4 content-start'
				/>

				<ToggleGroups groups={groups} />
			</Section>
		</>
	)
}

const ToggleGroups = ({ groups }) => {
	return (
		<dl
			className={cn(
				'col-span-8',
				'space-y-6 md:space-y-8 xl:space-y-12',
			)}
		>
			{Object.entries(groups).map(([group, items], idx) => (
				<dd key={kn(group)} id={slugify(group)}>
					<ToggleGroupHeader group={group} idx={idx} />

					{items.map(({ title, body }, iidx) => (
						<Toggle
							key={kn({ title })}
							title={title}
							subtitle={`${padZero(iidx + 1)}.`}
						>
							<Body
								body={body}
								className={cn(
									'__sm pb-4',
									'*:text-steel group-hover:*:text-indigo',
								)}
							/>
						</Toggle>
					))}
				</dd>
			))}
		</dl>
	)
}

const ToggleGroupHeader = ({ group, idx }) => {
	return (
		<Flex
			items='center'
			justify='between'
			className={cn('my-2 md:my-3', idx === 0 && 'md:mt-0')}
		>
			<h6 className='__label shrink-0 text-blue'>{group}</h6>
			<Divider color='steel 200' size='full' className='h-px' />
		</Flex>
	)
}

export const TogglesNav = ({ groups, className }) => {
	if (invalidObjectData(groups)) return null

	const links = Object.keys(groups).map(group => ({
		text: group,
		href: hashify(group),
	}))

	if (invalidArrObjectData(links)) return null

	return (
		<aside className={cn(className)}>
			<Flex
				as='nav'
				layout='stack'
				gap='sm'
				className={cn(
					'sticky top-24',
					'rounded-xl bg-steel-100/70',
					'p-2 md:p-4 xl:p-6',
					className,
				)}
			>
				{links.map((link, idx) => (
					<ButtonLink
						key={kn(link)}
						link={link}
						className='h6 w-max link'
					>
						{link.text}
					</ButtonLink>
				))}
			</Flex>
		</aside>
	)
}

export { CollectionToggles }
