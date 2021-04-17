module EventStoreViewer.App

open Elmish
open Elmish.Debug
open Elmish.HMR

open Update

Program.mkProgram init update HtmlView.view
|> Program.withDebugger
|> Program.withReactBatched "elmish-app"
|> Program.run
