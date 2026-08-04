<?php

// ======================================================
// Variáveis globais
// ======================================================

require_once ROOT_PATH_WARANAS_LIB . "/src/globals.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/protocol/protocolGlobals.php";

// ======================================================
// Helpers
// ======================================================

require_once ROOT_PATH_WARANAS_LIB . "/src/helpers/colors.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/helpers/formatters.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/helpers/minify.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/helpers/sanitizers.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/helpers/validators.php";

// ======================================================
// Utils
// ======================================================

require_once ROOT_PATH_WARANAS_LIB . "/src/utils/addedSvg.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/utils/distinctDigits.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/utils/getIframesheet.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/utils/handlingHTML.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/utils/setIframesheet.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/utils/waranasAssetsManager.php";

// ======================================================
// Core
// ======================================================

require_once ROOT_PATH_WARANAS_LIB . "/src/core/bootstrap.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/core/cache.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/core/cacheVerify.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/core/config.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/core/database.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/core/env.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/core/internalContent.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/core/renderer.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/core/router.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/core/security.php";

// ======================================================
// Protocolos HASH
// ======================================================

require_once ROOT_PATH_WARANAS_LIB . "/src/protocol/hashBIN/hashBIN.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/protocol/hashBIN/indexBin.php";

// ======================================================
// Protocolos BINTable
// ======================================================

require_once ROOT_PATH_WARANAS_LIB . "/src/protocol/BINTable/packerBin.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/protocol/BINTable/unpackerBin.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/protocol/BINTable/finderBin.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/protocol/BINTable/readBin.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/protocol/BINTable/writeBIN.php";
require_once ROOT_PATH_WARANAS_LIB .
    "/src/protocol/BINTable/createManifestBIN.php";

// ======================================================
// Services api
// ======================================================

require_once ROOT_PATH_WARANAS_LIB . "/src/services/api/registerApi.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/services/api/loaderApi.php";

// ======================================================
// API
// ======================================================

require_once ROOT_PATH_WARANAS_LIB . "/src/api/request.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/api/router.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/api/submit.php";

// ======================================================
// Componentes
// ======================================================

require_once ROOT_PATH_WARANAS_LIB . "/src/components/svg.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/boardComponent.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/btFloat.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/bubble.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/chat.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/doIt.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/formwhats.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/grid.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/hamburguer.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/iframesheet.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/inputSubmit.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/listing.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/menu.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/modal.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/search.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/section.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/slideshow.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/sliding.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/tabs.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/tagList.php";
require_once ROOT_PATH_WARANAS_LIB . "/src/components/textblock.php";
