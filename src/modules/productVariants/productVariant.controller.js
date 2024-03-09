import productVariantService from '#modules/productVariants/productVariant.service.js';
import productVariantMapper from '#modules/productVariants/productVariant.mapper.js';
import attributeMapper from '#modules/attributes/attribute.mapper.js';

/**
 * ProductVariantController class.
 */
class ProductVariantController {
  /**
   * Handles incoming request from the /products/:product_id/variants endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async index(request, response, next) {
    try {
      const { product_id } = request.params;

      const variants = await productVariantService.findAll(product_id);

      const productVariantsDto = variants.map((variant) => {
        const productVariantDto = productVariantMapper.toDto(variant);

        const productVariantAttributesDto = variant.attribute_combinations.map((attribute) =>
          attributeMapper.toDto(attribute)
        );

        // TODO add product images dto
        const variantImagesDto = variant.images;

        return {
          ...productVariantDto,
          attribute_combinations: productVariantAttributesDto,
          images: variantImagesDto,
        };
      });

      response.json({
        message: 'Ok',
        product_variants: productVariantsDto,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /products/:product_id/variants/:variant_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async show(request, response, next) {
    try {
      const { product_id, variant_id } = request.params;

      const variantById = await productVariantService.findById(product_id, variant_id);

      const productVariantDto = productVariantMapper.toDto(variantById);

      const productVariantAttributesDto = variantById.attribute_combinations.map((attribute) =>
        attributeMapper.toDto(attribute)
      );

      // TODO add product images dto
      const variantImagesDto = variantById.images;

      response.json({
        message: 'Ok',
        product_variant: {
          ...productVariantDto,
          attribute_combinations: productVariantAttributesDto,
          images: variantImagesDto,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductVariantController();
