import { NextPage } from "next"
import type { ReactElement } from "react"
import { MainLayout } from "@/layouts/MainLayout"

export type PageWithMainLayout = NextPage & { layout: typeof MainLayout }

export type PageWithLayoutType =
 | PageWithMainLayout

 export type LayoutProps = ({
    children,
    }: {
    children: ReactElement
    }) => ReactElement

export default PageWithLayoutType