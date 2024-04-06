<script setup>

</script>
<template>
    <!-- Card Section -->
    <RouterLink :to="'/pair/a'">
        <div class=" mx-auto">
            <div
                class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
                <div class="inline-flex justify-center items-center">
                    <span class="size-2 inline-block bg-red-500 rounded-full me-2"></span>
                    <span class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">SOL - YAY</span>
                </div>

                <div class="text-center flex flex-row justify-center">
                    <img class="rounded-full h-16"
                        src="https://app.meteora.ag/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&amp;w=64&amp;q=75">
                    <img class="rounded-full h-16" src="https://yaycazz.com/yaycazz.png" alt="">
                </div>

                <dl class="flex justify-center items-center divide-x divide-gray-200 dark:divide-gray-700">
                    <dt class="pe-3">
                        <span class="inline-block text-sm">
                                $8,162,721.81
                            </span>
                        <span class="block text-sm text-gray-500">Liqudity</span>
                    </dt>
                    <dd class="text-start ps-3">
                        <span class="text-sm font-semibold text-gray-800 dark:text-gray-200">300%</span>
                        <span class="block text-sm text-gray-500">APY</span>
                    </dd>
                </dl>
            </div>

        </div>
    </RouterLink>


</template>