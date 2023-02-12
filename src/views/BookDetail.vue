<script setup lang="ts">
import { fetchBook } from '@/api/queries'
import { useQuery } from '@tanstack/vue-query'
import { useLoadingStore } from '@/stores/loadingStore'
import { AxiosError } from 'axios'

const route = useRoute()
const loadingStore = useLoadingStore()
const { t } = useI18n()

const { isLoading, fetchStatus, isError, error, data } = useQuery({
	queryKey: ['book'],
	queryFn: () => fetchBook(route.params.bookId as string),
	retry: 1,
})

// 解決閃現上一筆資料的問題，應該有更好的做法
const showContent = ref(false)
const waitingForDataUpdate = () => {
	setTimeout(() => {
		showContent.value = true
	}, 200)
}
waitingForDataUpdate()

watchEffect(() => {
	fetchStatus.value === 'fetching'
		? loadingStore.setIsLoading(true)
		: loadingStore.setIsLoading(false)
})
const errorMessage = computed(() => {
	if (error.value instanceof AxiosError) {
		switch (error.value.response?.status) {
			case 404:
				return t('error.404')
		}
	}
})
</script>

<template>
	<main>
		<span v-if="isLoading"></span>
		<span v-else-if="isError">
			<ErrorMsg :msg="errorMessage" />
		</span>
		<div v-else :class="{ 'opacity-0': !showContent }">
			<TopNav :title="data.title">
				<template #rightIcon>
					<IconBase
						@click="
							$router.push({
								name: 'edit_book',
								params: { bookId: data.id },
							})
						"
						:class="{ 'opacity-0': !$route.meta.rightIcon }"
						:icon="$route.meta.rightIcon"
					/>
				</template>
			</TopNav>
			<PageWrapper>
				<section
					class="mx-auto w-[300px] mt-4 md:w-[560px] md:mt-4 xl:w-[780px] xl:mt-8"
				>
					<div
						class="bg-white px-4 py-2 flex flex-col rounded mb-4 md:text-lg md:px-5 md:py-3 md:mb-6"
					>
						<span class="mb-2 select-none">{{ $t('book_detail.title') }} </span>
						<p>{{ data.title }}</p>
					</div>
					<div
						class="bg-white px-4 py-2 flex flex-col rounded mb-4 md:text-lg md:px-5 md:py-3 md:mb-6"
					>
						<span class="mb-2 select-none"
							>{{ $t('book_detail.author') }}
						</span>
						<p>{{ data.author }}</p>
					</div>
					<div
						class="bg-white px-4 py-2 flex flex-col rounded mb-4 md:text-lg md:px-5 md:py-3 md:mb-6"
					>
						<span class="mb-2 select-none">{{
							$t('book_detail.description')
						}}</span>
						<p class="leading-[2rem]">{{ data.description }}</p>
					</div>
				</section>
			</PageWrapper>
		</div>
	</main>
</template>
