<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'
import { useMutation } from '@tanstack/vue-query'
import type { IBookData, IBookRequest } from '@/types'
import { http } from '@/api/http'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

type BookFormTypes = 'add' | 'edit'

const props = defineProps<{
	formType: BookFormTypes
	formData?: IBookData
}>()

const requiredErrorMessage = computed(() => t('error.required'))
// zod schema
const validationSchema = toFormValidator(
	zod.object({
		title: zod.string().min(1, { message: requiredErrorMessage.value }),
		author: zod.string().min(1, { message: requiredErrorMessage.value }),
	})
)

// vee-validate useForm
const { handleSubmit, errors } = useForm({
	validationSchema,
	initialValues: {
		title: props.formData?.title || '',
		author: props.formData?.author || '',
		description: props.formData?.description || '',
	},
})
const { value: title } = useField<string>('title')
const { value: author } = useField<string>('author')
const { value: description } = useField<string>('description')

// 新增書本
const { mutate: mutateAdd } = useMutation({
	mutationFn: (newBook: IBookRequest) => http.post('/books', newBook),
	onSuccess: () => {
		router.push({ name: 'books' })
	},
})

// 修改書本
const { mutate: mutateEdit } = useMutation({
	mutationFn: (newData: IBookRequest) =>
		http.patch(`/books/${route.params.bookId}`, newData),
	onSuccess: () => router.push({ name: 'book_detail' }),
})

// 按下確認按鈕
const onConfirm = (data: IBookRequest) => {
	props.formType === 'add' ? mutateAdd(data) : mutateEdit(data)
}

// 表單送出 function
const onSubmit = handleSubmit((values) => {
	onConfirm(values)
})
</script>

<template>
	<form
		@submit="onSubmit"
		class="mx-auto w-[300px] mt-4 md:w-[560px] md:mt-4 xl:w-[780px] xl:mt-8"
	>
		<div class="form-item">
			<label for="title"
				>{{ $t('book_detail.title') }}
				*
			</label>
			<input v-model="title" class="form-input" type="text" />
			<span class="error">{{ errors.title }}</span>
		</div>
		<div class="form-item">
			<label for="author"
				>{{ $t('book_detail.author') }}
				*
			</label>
			<input v-model="author" class="form-input" type="text" />
			<span class="error">{{ errors.author }}</span>
		</div>
		<div class="form-item">
			<label for="author">{{ $t('book_detail.description') }}</label>
			<textarea v-model="description" rows="10" class="form-input"></textarea>
		</div>

		<!-- 按鈕 -->
		<div class="flex justify-between gap-x-4 mt-6 md:justify-end">
			<!-- 取消按鈕 -->
			<ButtonBase
				@click="
					$router.push({ name: formType === 'add' ? 'books' : 'book_detail' })
				"
				class="w-full md:w-[140px] lg:w-[180px]"
				btnType="cancel"
				type="button"
				>{{ $t('buttons.cancel') }}</ButtonBase
			>

			<!-- 確認按鈕 -->
			<ButtonBase
				class="w-full md:w-[140px] lg:w-[180px]"
				btnType="ok"
				type="submit"
			>
				{{ formType === 'add' ? $t('buttons.add') : $t('buttons.save') }}
			</ButtonBase>
		</div>
	</form>
</template>

<style lang="scss" scoped>
.form-item {
	@apply relative bg-white px-4 py-2 flex flex-col rounded md:text-lg md:px-5 md:py-3;

	label {
		@apply mr-2 select-none;
	}
}

.form-input {
	@apply w-full p-2 rounded mt-2 mb-5 lg:mb-6;
	outline: 1px solid #d8d8d8;

	&:focus {
		outline: 1px solid #78838f;
	}
}

.error {
	@apply absolute bottom-2 lg:bottom-3 text-sm text-red-600;
}
</style>
